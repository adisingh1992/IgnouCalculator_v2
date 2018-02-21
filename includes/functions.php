<?php
    require_once 'html_parser.php';
    require_once 'initdb.php';

    function validator($input, $flag){
        if($flag === 1){
            if(strlen($input) === 9){
                return filter_var($input, FILTER_SANITIZE_STRING);
            }
        }
        elseif ($flag === 2){
            if(strlen($input) === 1){
                return filter_var($input, FILTER_VALIDATE_INT);
            }
        }
        return false;
    }

    function url_request($url, $data, $method = "POST"){
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => $method,
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_html($url, false, $context) or false;
        return $result;
    }

    function fetch_data($enrolment, $program, $msg){
        $url = 'https://gradecard.ignou.ac.in/gradecardM/Result.asp';
        $data_array = array('eno' => $enrolment, 'program' => $program, 'HIDDEN_submit' => 'OK');
        $data = url_request($url, $data_array);
        if($data === false){
            return null;
        }
        $marks = array();
        $name[0] = $data->find('b', 4)->plaintext;
        if($name[0] === null){
            $msg->error("Oops!! Looks like you've entered an invalid enrolment number, please try again");
            die();
        }
        $marks[] = $name;
        foreach ($data->find('tr') as $element) {
            for($i=0; $i<8; $i++){
                $temp_array[$i] = $element->find('td', $i)->plaintext;
            }
            $marks[] = $temp_array;
        }
        return $marks;
    }

    function calculate_result($marks){
        $len = count($marks);
        $assignment_marks[0] = "Assignment";
        $theory_marks[0] = "Marks";
        $total[0] = "Total";
        for($i=1; $i<$len; $i++){
            if(is_numeric($marks[$i][1])){
                $temp_assignment_marks = round(($marks[$i][1]) * 0.25);
                $assignment_marks[] = $temp_assignment_marks;
            }else{
                $temp_assignment_marks = 0;
                $assignment_marks[] = '-';
            }
            $temp_marks = 0;
            $subject_count = 0;
            for($j=2; $j<count($marks[$i]); $j++){
                if(is_numeric($marks[$i][$j])){
                    $temp_marks += $marks[$i][$j];
                    $subject_count += 1;
                }
            }
            if(!empty($subject_count)){
                $temp_marks = round(($temp_marks * 0.75) / $subject_count);
            }
            $theory_marks[] = $temp_marks;
            $total[] = $temp_assignment_marks + $temp_marks;
        }
        return array($assignment_marks, $theory_marks, $total);
    }

    function print_final_marks($total_marks){
        $len = count($total_marks);
        $final = 0;
        for($i=0; $i<$len; $i++){
            $final += $total_marks[$i];
        }
        return array($final);
    }

    function marks_response($marks){
        if($marks === null){
            return null;
        }
        $total_marks = calculate_result($marks);
        for($i=0; $i<count($marks); $i++){
            $marks[$i][8] = $total_marks[0][$i];
            $marks[$i][9] = $total_marks[1][$i];
            $marks[$i][10] = $total_marks[2][$i];            
        }
        $marks[] = print_final_marks($total_marks[2]);
        return $marks;
    }

    function fetch_marks_cache($enrolment, $program){
        $query = "SELECT datadump FROM marks WHERE eno=%s AND program=%s";
        $result = DB::query($query, $enrolment, $program);
        if(empty($result)){
            return false;
        }
        $result = unserialize($result[0]["datadump"]);
        return $result;
    }

    function update_marks_cache($enrolment, $marks, $program){
        $query = "SELECT eno FROM marks WHERE eno=%s AND program=%s";
        $result = DB::query($query, $enrolment, $program);
        
        $marks = serialize($marks);
        if(empty($result)){
            DB::insert("marks", array(
                "eno" => $enrolment,
                "datadump" => $marks,
                "program" => $program
            ));
        }else{
            DB::update("marks", array(
                "datadump" => $marks,
                "timing" => DB::sqleval("NOW()")), "eno=%s AND program=%s", $enrolment, $program
            );
        }
    }
    
    function marks_request($enrolment, $program, $msg){
        $marks = marks_response(fetch_data($enrolment, $program, $msg));
        if($marks === null){
            $marks = fetch_marks_cache($enrolment, $program);
            if($marks === false){
                $msg->error("Oops, IGNOU's servers are down currently, try again later..!!");
                die();
            }
            else{
                $msg->warning("IGNOU's servers are down currently, results you are seeing are a cached copy from our servers!!");
                echo json_encode($marks);
            }
        }
        else{
            echo json_encode($marks);
            flush();
            update_marks_cache($enrolment, $marks, $program);
        }
    }
    
    function assignment_status_response($enrolment, $program, $msg){
        $program = strtoupper($program);
        $url = "http://admission.ignou.ac.in/changeadmdata/StatusAssignment.asp";
        $data_array = array('enrno' => $enrolment, 'program' => $program, 'Submit' => '1');
        $data = url_request($url, $data_array);
        if(empty($data)){
            $msg->error("Oops, IGNOU's servers are down currently, try again later..!!");
            die();
        }
        $table_data = $data->find('table', 1);
        return $table_data;
    }

    function fetch_student_details($data){
        $table = $data->find('table', 0);
        $table_rows = $table->find("tr");
        $rows_len = count($table_rows);
        for($i=1; $i<$rows_len; $i++){
            $temp = $table_rows[$i];
            $t1 = $temp->find("td", 0)->plaintext;
            $t2 = $temp->find("td", 1)->plaintext;
            $student_details[$t1] = $t2;
        }
        $details = "<br/><table class='table table-striped table-bordered'><tr class='mdb-color darken-3 text-white center-justified'><td colspan = '2'>STUDENT DETAILS</td></tr>";
        foreach($student_details as $key => $value){
            $details .= "<tr><td><strong>".$key."</strong></td><td>".$value."</td></tr>";
        }
        $details = $details."</table>";
        return $details;
    }

    function student_details_response($enrolment, $program, $msg){
        $url = "http://admission.ignou.ac.in/changeElective/StudentRegStatus.asp";
        $data_array = array('EnrNo' => $enrolment, 'Program' => $program, 'Submit' => 'Submit');
        $data = url_request($url, $data_array);
        if(empty($data)){
            $msg->error("Oops, IGNOU's servers are down currently, try again later..!!");
            die();
        }
        $student_details = fetch_student_details($data);
        return $student_details;
    }

    function get_news_response($msg){
        $data = url_request("http://www.ignou.ac.in/ignou/bulletinboard/news/latest", array());
        if($data === false){
            return array("<a href='books.php'> Get Complete Study Materials For BCA / MCA Programme </a>", "<a href='project-and-synopsis.php'> Download Latest Final Year Projects </a>", "<a href='videos.php'> Study With IgnouCalculator's Online Classes </a>");
        }

        $main_div = $data->find("div.middleconten-new", 0);
        $news_rows = $main_div->find("div.innerdiv");
        $news_line = array();

        foreach($news_rows as $news){
            $news_anchor = $news->find("a", 0);
            $news_title = $news_anchor->find("strong", 0);
            $news_link = $news_anchor->href;
            array_push($news_line, "<a href='http://www.ignou.ac.in/".$news_link."' target='_blank'>".$news_title."</a>");
        }
        return $news_line;
    }

    function get_admission_info($enrolment, $program){
        $url = "https://admission.ignou.ac.in/changeadmdata/AdmissionStatusNew.ASP";
        $data_array = array('EnrNo' => $enrolment, 'Program' => $program, 'Submit' => 'Submit');
        $data = url_request($url, $data_array);
        if(empty($data)){
            return false;
        }
        $table = $data->find('table', 3);
        $table_row = $table->find("tr", 1);
        $admit_year = $table_row->find("td", 1);
        $admit_year = explode('-', $admit_year->plaintext);

        switch($admit_year[0]){
            case "Jul":
                $admit_year[0] = "July+";
                break;
            case "Jan":
                $admit_year[0] = "January+";
                break;
        }
        $admit_year = implode($admit_year);
        $table_row = $table->find("tr", 7);
        $sc = $table_row->find("td", 1);

        return array($admit_year, $sc->plaintext);
    }

    function fetch_student_list($admit_year, $program, $sc, $type = 0){
        $url = "http://www.myignou.com/StudentList?studyCenter=".$sc."&program=".$program."&batch=".$admit_year;
        $data = url_request($url, array(), "GET");
        if(empty($data)){
            return false;
        }
        $rows = $data->find('tbody tr');
        if($type === 0){
            echo "<table class='table table-striped table-bordered'><tr class='mdb-color darken-3 text-white'><strong><td>Serial Number #</td><td>Name of the Student</td><td>Enrollment Number</td></strong></tr>";
            $row_counter = 0;
            foreach($rows as $r){
                $eno = $r->find('td', 1)->plaintext;
                $name = $r->find('td', 2)->plaintext;
                echo "<tr><td>".$row_counter++."</td><td class='friends' data-value=".$eno."><strong>".$name."</strong></td><td>".$eno."</td></tr>";
            }
            echo "</table><script>$('table tr:eq(1)').remove();</script>";
        }else if($type === 1){
            echo "<marquee onmouseover='this.stop();' onmouseout='this.start();'>";
            foreach($rows as $r){
                $eno = $r->find('td', 1)->plaintext;
                $name = $r->find('td', 2)->plaintext;
                if(trim($name) !== ""){
                    echo "<button class='mx-1 my-1 px-1 py-0 friend btn btn-outline-elegant' data-eno='".$eno."'>".$name."</button>";
                }
            }
            echo "</marquee>";
            echo "<script>$('.friend').on('click', function (event) { event.preventDefault(); $('#eno').val(($(this).data('eno'))); $('#submit').click(); });</script>";
        }
    }

    function submit_feedback($username, $email, $subject, $msg){
        DB::insert("feedbacks", array(
            "username" => $username,
            "email" => $email,
            "subject" => $subject,
            "msg" => $msg
        ));
        echo "Feedback submitted successfully!!";
    }

    function subscribe($email){
        DB::insert("subscribers", array(
            "email" => $email
        ));
        echo "You've been subscribed successfully!!";
    }

    function fetch_projects($project_type, $msg){
        if($project_type !== "more"){
            $project_type = "%".$project_type."%";
            $query = "SELECT * FROM projects WHERE language LIKE %s";
            $result = DB::query($query, $project_type);
        }else{
            $query = "SELECT * FROM projects";
            $result = DB::query($query);
        }
        if(empty($project_type)){
            $msg->error("Oops!! Looks like you've entered an invalid choice, please try again");
            die();
        }
        foreach($result as $r){
            echo "<div class='row'> <div class='col-md-12'> <div class='jumbotron text-center'> <h3 class='card-title h3-responsive mt-2'><strong>".$r['name']."</strong></h3> <p class='blue-text mb-4 font-bold'>&lt;/ ".$r['language']." &gt;</p><div class='h6-responsive text-muted d-flex justify-content-center'> <p class='card-text mb-3 center-justified' style='max-width:55rem'>".$r['description']."</p><br/> </div><span class='text-center justify-content-center blue-text'>Total Downloads: ".$r['counter']."</span><br/><br/> <hr class='my-4'> <button  id='download' class='btn btn-rounded btn-outline-black' style='background-color:#fff;margin-top:-70px;' data-id='".$r['id']."'><i class='fa fa-download'></i> Download</button> </div></div></div>";
        }
    }
    
    function update_projects_counter($project_id){
        $query = "SELECT filename, counter FROM projects WHERE id=%i";
        $result = DB::query($query, $project_id);
        $filename = $result[0]["filename"];
        $counter = $result[0]["counter"]+1;
        
        DB::update("projects", array(
            "counter" => $counter), "id=%i", $project_id
        );
        return $filename;
    }

    function validate_date($date, $format = 'Y-m-d'){
        $d = DateTime::createFromFormat($format, $date);
        if($d && $d->format($format) == $date){
            return strtotime($date);
        }
    }

    function update_profile($contact, $dob, $address, $uuid, $msg){
        $query = array();
        if(empty($contact) && empty($dob) && empty($address)){
            $msg->error("Oops!! Nothing to update");
            return;
        }else if(empty($contact) && empty($dob) && !empty($address)){
            $query["address"] = $address;
        }else if(empty($dob) && !empty($contact) && empty($address)){
            $query["contact"] = $contact;
        }else if(empty($address) && empty($contact) && !empty($dob)){
            $query["dob"] = $dob;
        }else if(empty($contact) && !empty($dob) && !empty($address)){
            $query["dob"] = $dob;
            $query["address"] = $address;
        }else if(empty($dob) && !empty($contact) && !empty($address)){
            $query["contact"] = $contact;
            $query["address"] = $address;
        }else if(empty($address) && !empty($contact) && !empty($dob)){
            $query["dob"] = $dob;
            $query["contact"] = $contact;
        }else if(!empty($contact) && !empty($dob) && !empty($address)){
            $query["dob"] = $dob;
            $query["address"] = $address;
            $query["contact"] = $contact;
        }
        if(DB::update("users", $query, "uuid=%s", $uuid)){
            $msg->success("Profile Successfully Updated!!");
            return true;
        }
    }

    function fetch_raw_youtube_data($service, $part, $optional, $idType, $id, $api_key){
        $api_url = "https://www.googleapis.com/youtube/v3/".$service."?order=date&part=".$part.$optional."&".$idType."=".$id."&key=".$api_key;
        $playlists = json_decode(file_get_contents($api_url));
        return $playlists;
    }

    function fetch_playlist_videos($playlist_id, $service_type, $part_type, $optional_field, $id_type, $api_key){
        $playlist_data = (fetch_raw_youtube_data($service_type[1], $part_type[0], $optional_field[0], $id_type[1], $playlist_id, $api_key));
        foreach($playlist_data->items as $video){
            echo "<div class='col-md-4'><div class='card mt-2'> <div class='view overlay hm-white-slight mt-0'> <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' data-src='".($video->snippet->thumbnails->default->url)."' alt='video thumbnail' class='b-lazy' id='".($video->snippet->resourceId->videoId)."' height='auto;' width='100%' class='img-fluid' alt='video thumbnail' style='border-radius:5px 5px 0px 0px'/> </div><div class='floating-button-div'><button class='btn btn-floating pull-right videos' id='".($video->snippet->resourceId->videoId)."' data-toggle='modal' data-target='#yt_myModal' style='background-color:#cc181e'> <i class='fa fa-youtube-play'></i> </button></div><div class='card-body'> <h4 class='card-title h4-responsive pink-text youtube-video-title'><i class='fa fa-book'></i> ".($video->snippet->title)."</h4><hr> <p class='card-text text-justify youtube-video-description'>".($video->snippet->description)."</p><small class='blue-text pull-right'><i><cite>Uploaded on: ".date('Y-m-d H:i:s', strtotime($video->snippet->publishedAt))."</cite></i></small> </div></div></div>";
        }
    }

    function fetch_video($video_id, $service_type, $part_type, $optional_field, $id_type, $api_key){
        $video_data = (fetch_raw_youtube_data($service_type[3], $part_type[1], $optional_field[1], $id_type[2], $video_id, $api_key));
        return "<div class='col-3'><i class='fa fa-eye fa-2x'></i> <small class='h6-responsive grey-text'>".($video_data->items{'0'}->statistics->viewCount)."</small></div><div class='col-3'><i class='fa fa-thumbs-up fa-2x'></i> <small class='h6-responsive grey-text'>".($video_data->items{'0'}->statistics->likeCount)."</small></div><div class='col-3'><i class='fa fa-thumbs-down fa-2x'></i> <small class='h6-responsive grey-text'>".($video_data->items{'0'}->statistics->dislikeCount)."</small></div><div class='col-3'><a href='#' class='h6-responsive black-text' data-dismiss='modal'><i class='fa fa-times-circle-o fa-2x' aria-hidden='true'></i></a></div>";
    }

    function fetch_comments($api_key, $part, $Id){
        $api_url = "https://www.googleapis.com/youtube/v3/commentThreads?part=".$part."&textFormat=plainText&videoId=".$Id."&key=".$api_key;
        $comments = json_decode(file_get_contents($api_url));
        $video_comments = "";
        foreach($comments->items as $comment){
            $video_comments .= "<div class='card-title px-2 py-2'><img src='".($comment->snippet->topLevelComment->snippet->authorProfileImageUrl)."' alt='commenters profile picture' style='border-radius: 50%; height: 30px; width: 30px;' class='mr-2'/><strong class='darkgrey-text text-capitalize' style='font-family: courier; font-weight: bold;'>".($comment->snippet->topLevelComment->snippet->authorDisplayName)."</strong></div><div class='card-text px-2 text-capitalize text-justified' style='font-family: georgia;'><p>".($comment->snippet->topLevelComment->snippet->textDisplay)."<br/>".($comment->snippet->topLevelComment->snippet->likeCount)."&nbsp; <i class='fa fa-thumbs-up text-muted'></i></p><hr class='comment-hr'/></div>";;
        }
        return $video_comments;
    }
?>