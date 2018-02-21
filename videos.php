<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    require_once "includes/initvideos.php";
    require_once "includes/functions.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["videos_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        $flag = validator(htmlspecialchars($_POST["flag"]), 2);
        if($flag === 1){
            $playlist_id = filter_input(INPUT_POST, "playlist_id", FILTER_SANITIZE_STRING);
            fetch_playlist_videos($playlist_id, $service_type, $part_type, $optional_field, $id_type, $api_key, $msg);
        }else if($flag === 2){
            $video_id = filter_input(INPUT_POST, "video_id", FILTER_SANITIZE_STRING);
            $video_data = fetch_video($video_id, $service_type, $part_type, $optional_field, $id_type, $api_key);
            $video_comments = fetch_comments($api_key, $part_type[0], $video_id);
            $video_response = array("video_data" => $video_data, "video_comments" => $video_comments);
            echo json_encode($video_response);
        }
    }else{
        require_once "includes/views.php";

        $form_id = md5(rand());
        $_SESSION["videos_id"] = $form_id;

        $view = new Views();
        $playlist_data = (fetch_raw_youtube_data($service_type[2], $part_type[0], $optional_field[1], $id_type[0], $channel_Id, $api_key));
        $view->playlists = $playlist_data->items;
        $view->render("header.html");
        $view->render("videos.html", $form_id);
        $view->render("footer.html");
    }
?>