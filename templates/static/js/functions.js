$(document).ajaxStart(function () {
    $('.loading').show();
});

$(document).ajaxStop(function () {
    $('.loading').hide();
});

function getErrors() {
    $("#error").load("error_ajax.php");
}

function get_form_data(url) {
    var eno = $("#eno").val();
    var form_id = $("#form_id").val();
    var program = $("#program").val();
    $.ajax({
        type: 'POST',
        url: url,
        data: {eno: eno, form_id: form_id, program: program},
        success: function (data) {
            generate_table(program);
            validate_marks_data(data, eno);
            fetch_friends(eno, program, form_id);
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    getErrors();
    $('#eno').val('');
}

function generate_table(program) {
    $("#instructions").hide();
    $("#name").html("Name: ");
    $("#enum").html("Enrollment Number: ");
    if (program === "MCA") {
        var content = "<table class='table table-striped table-bordered table-sm text-center' style='font-size: 14px;'> <thead class='mdb-color darken-3 text-white'> <tr> <th>Code</th> <th>Course Title</th> <th>Assignment</th> <th>Lab 1</th> <th>Lab 2</th> <th>Lab 3</th> <th>Lab 4</th> <th>Term End Theory</th> <th>Status</th> <th>Assignment(@25%)</th> <th>Marks(@75%)</th> <th>Total</th> <th>Progress Bar</th> </tr></thead> <tbody> <tr> <td colspan=13><strong>Semester 1</strong></td></tr><tr> <td>MCS011</td><td>Problem Solving and Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS012</td><td>Computer Organization and Assembly language Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='2' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS013</td><td>Discrete Mathematics</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='3' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS014</td><td>Systems Analysis and Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='4' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS015</td><td>Communication Skills</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='5' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL016</td><td>Internet Concepts and Web Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='6' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL017</td><td>C and Assembly Language Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='7' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 2</strong></td></tr><tr> <td>MCS021</td><td>Data and File Structures</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='8' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS022</td><td>Operating System Concepts and Networking Management</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='9' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS023</td><td>Introduction to Database Management Systems</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='10' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS024</td><td>Object Oriented Technologies and Java Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='11' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL025</td><td>Lab (based on MCS-021, 022, 023 & 024)</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='12' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 3</strong></td></tr><tr> <td>MCS031</td><td>Design and Analysis of Algorithms</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='13' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS032</td><td>Object Oriented Analysis and Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='14' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></td></tr><tr> <td>MCS033</td><td>Advanced Discrete Mathematics</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='15' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></td></tr><tr> <td>MCS034</td><td>Software Engineering </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='16' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></td></tr><tr> <td>MCS035</td><td>Accountancy and Financial Management</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='17' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></td></tr><tr> <td>MCSL036</td><td>Lab(based on MCS-032, 034 and 035)</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='18' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></td></tr><tr> <td colspan=13><strong>Semester 4</strong></td></tr><tr> <td>MCS041</td><td>Operating Systems</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='19' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS042</td><td>Data Communication and Computer Networks</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='20' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS043</td><td>Advanced Database Management Systems</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='21' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS044</td><td>Mini Project</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='22' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL045</td><td>Lab(UNIX & Oracle)</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='23' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 5</strong></td></tr><tr> <td>MCS051</td><td>Advanced Internet Technologies</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='24' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS052</td><td>Principles of Management and Information Sytems</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='25' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS053</td><td>Computer Graphics and Multimedia</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='26' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL054</td><td>Lab( based on MCS-051 & 053)</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='27' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSE003</td><td>Artificial Intelligence and Knowledge Management</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='28' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSE004</td><td>Numerical and Statistical Computing</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='29' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSE011</td><td>Parallel Computing</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='30' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 6</strong></td></tr><tr> <td>MCSP060</td><td>Project</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><div class='progress'> <div class='progress-bar progress-bar-striped active' id='31' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr> <tr> <td>BCS012</td><td>Basic Mathematics(Optional)</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr> <tr><td colspan=6><strong>Final Marks:</strong></td><td colspan='4'><strong>Final Percentage:</strong></td><td colspan='3'><div class='progress'><div class='progress-bar progress-bar-striped active' style='background-color: green !important;' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr></tbody></table>";
        $("#data_table").html(content);
    } else if (program === "BCA") {
        var content = "<table class='table table-striped table-bordered table-sm text-center' style='font-size: 14px;'> <thead class='mdb-color darken-3 text-white'> <tr> <th>Code</th> <th>Course Title</th> <th>Assignment</th> <th>Lab 1</th> <th>Lab 2</th> <th>Lab 3</th> <th>Lab 4</th> <th>Term End Theory</th> <th>Status</th> <th>Assignment(@25%)</th> <th>Marks(@75%)</th> <th>Total</th> <th>Progress Bar</th> </tr></thead> <tbody> <tr> <td colspan=13><strong>Semester 1</strong></td></tr><tr> <td>FEG02</td><td>Foundation Course in English 2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>ECO01</td><td>Business Organization</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS011</td><td>Computer Basics and PC Software</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS012</td><td>Basic Mathematics</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL013</td><td>Computer Basics and PC S/w Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 2</strong></td></tr><tr> <td>ECO02</td><td>Accountancy 1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS011</td><td>Problem Solving and Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS012</td><td>CO &amp; Assembly Lang Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS013</td><td>Discrete Mathematics</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS015</td><td>Communication Skills</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL021</td><td>C Language Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL022</td><td>Assembly Lang Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 3</strong></td></tr><tr> <td>MCS021</td><td>Data and File Structures</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS023</td><td>Introduction to Database Management System</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS014</td><td>System Analysis and Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS031</td><td>Programming in C++</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL032</td><td>C++ Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL033</td><td>Data and File Structure Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL034</td><td>DBMS Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 4</strong></td></tr><tr> <td>BCS040</td><td>Statistical Techniques</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS024</td><td>OO Techs and Java Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS041</td><td>Fundaments of Computer Networks</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS042</td><td>Intro to Algorithm Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCSL016</td><td>Internet Concepts &amp; Web Design</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL043</td><td>Java Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL044</td><td>Statistical Techniques Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL045</td><td>Algorithm Design Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 5</strong></td></tr><tr> <td>BCS051</td><td>Intro to S/w Engineering</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS052</td><td>Network Programming &amp; Administration</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS053</td><td>Web Programming</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS054</td><td>Numerical Techniques</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCS055</td><td>Business Communication</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL056</td><td>Network Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL057</td><td>Web Programming Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL058</td><td>Numerical Techniques Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=13><strong>Semester 6</strong></td></tr><tr> <td>BCS062</td><td>E-Commerce</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>MCS022</td><td>OS Concepts &amp; Networking Mgmt</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSL063</td><td>OS Concepts &amp; Networking Management Lab</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td>BCSP064</td><td>Project</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td> <div class='progress'> <div class='progress-bar progress-bar-striped active' id='1' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr><tr> <td colspan=6><strong>Final Marks:</strong></td><td colspan='4'><strong>Final Percentage:</strong></td><td colspan='3'> <div class='progress'> <div class='progress-bar progress-bar-striped active' style='background-color: green !important;' role='progressbar' aria-valuemin='0' aria-valuemax='100' style=''></div></div></td></tr></tbody> </table>";
        $("#data_table").html(content);
    }
}

function validate_marks_data(marks, eno) {
    try {
        $.parseJSON(marks);
    } catch (error) {
        $("#instructions").show();
        $("#name").html("");
        $("#enum").html("");
        $("#data_table").html(marks);
        return;
    }
    populate_table(JSON.parse(marks), eno);
}

function subject_search(subject) {
    var trs = $("tr");
    len = trs.length;
    for (x = 2; x < len; x++) {
        table_subject = trs[x].children[0].innerHTML;
        if (subject === table_subject) {
            return x;
        }
    }
}

function populate_table(marks, eno) {
    $("#name").html(marks[0][0]);
    $("#enum").html("Enrollment Number: " + eno);
    var trs = $("tr");
    data_rows = marks.length;
    for (i = 2; i < data_rows - 1; i++) {
        key = subject_search((marks[i][0]));
        for (j = 1; j <= 10; j++) {
            trs[key].children[j + 1].innerHTML = marks[i][j];
        }
        trs[key].children[j + 1].children[0].children[0].style.width = marks[i][10] + "%";
        if (marks[i][10] > 40) {
            trs[key].children[j + 1].children[0].children[0].className += " bg-success";
        } else if (marks[i][10] < 35) {
            trs[key].children[j + 1].children[0].children[0].className += " bg-danger";
        } else if (marks[i][10] >= 35 && parseInt(marks[i][10]) <= 40) {
            trs[key].children[j + 1].children[0].children[0].className += " bg-warning";
        }
        if (trs[key].children[8].innerHTML === "Not Completed") {
            trs[key].children[j + 1].children[0].children[0].className = "progress-bar progress-bar-striped active bg-danger";
        }
    }
    trs[trs.length - 1].children[0].innerHTML += marks[data_rows - 1][0];
    trs[trs.length - 1].children[1].innerHTML += (((marks[data_rows - 1][0]) / ((data_rows - 3) * 100) * 100).toFixed(2) + "%");
    trs[trs.length - 1].children[2].children[0].children[0].style.width = (((marks[data_rows - 1][0]) / ((data_rows - 3) * 100) * 100) + "%");
    if (trs[2].children[2].innerHTML === "") {
        for (i = 1; i <= 14; i++) {
            trs[i].style.display = 'none';
        }
    }
    if (trs[38].children[9].innerHTML === "-" && trs[38].children[10].innerHTML === "-") {
        trs[38].style.display = 'none';
    }
    $("#friends_list").html('<strong class="h4-responsive animated flipInX infinite" style="font-family: courier; word-spacing: 5px;">LOADING FELLOW STUDENTS LIST</strong>');
    $("table").floatThead();
}

function get_assignment_status() {
    var eno = $("#eno").val();
    var program = $("#program").val();
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: 'assignment-status.php',
        data: {eno: eno, program: program, form_id: form_id},
        success: function (data) {
            $("#instructions").hide();
            $("#status").show();
            $("#status-table").html(data);
            getErrors();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
            $("#instructions").show();
            $("#status").hide();
        }
    });
    $('#eno').val('');
}

function get_student_details() {
    var eno = $("#eno").val();
    var program = $(".program").val();
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: 'student-details.php',
        data: {eno: eno, program: program, form_id: form_id},
        success: function (data) {
            $("#details").html(data);
            getErrors();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    $('#eno').val('');
}

function get_admit_card() {
    var session = $("#session").val();
    var url = "https://ignouhall.ignou.ac.in/HallTicket/Hall_" + session + "/Hall" + session + ".asp";
    $('#admit_form').attr('action', url);
}

function update_profile(contact, dob, address) {
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: "profile.php",
        data: {contact: contact, dob: dob, address: address, form_id: form_id, type: "update"},
        success: function () {
            getErrors();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
}

function generate_course_table(programme) {
    switch (programme) {
        case "BCA":
            $("#courses").html("<table class='table table-striped table-sm table-bordered'> <tbody> <tr> <td><strong>Semester 1</strong></td></tr><tr> <td>FEG02</td><td>ECO01</td><td>BCS011</td><td>BCS012</td><td>BCSL013</td></tr><tr> <td><strong>Semester 2</strong></td></tr><tr> <td>ECO02</td><td>MCS011</td><td>MCS012</td><td>MCS013</td><td>MCS015</td><td>BCSL021</td><td>BCSL022</td></tr><tr> <td><strong>Semester 3</strong></td></tr><tr> <td>MCS021</td><td>MCS023</td><td>MCS014</td><td>BCS031</td><td>BCSL032</td><td>BCSL033</td><td>BCSL034</td></tr><tr> <td><strong>Semester 4</strong></td></tr><tr> <td>BCS040</td><td>MCS024</td><td>BCS041</td><td>BCS042</td><td>MCSL016</td><td>BCSL043</td><td>BCSL044</td><td>BCSL045</td></tr><tr> <td><strong>Semester 5</strong></td></tr><tr> <td>BCS051</td><td>BCS052</td><td>BCS053</td><td>BCS054</td><td>BCS055</td><td>BCSL056</td><td>BCSL057</td><td>BCSL058</td></tr><tr> <td><strong>Semester 6</strong></td></tr><tr> <td>BCS062</td><td>MCS022</td><td>BCSL063</td><td>BCSP064</td></tr></tbody></table>");
            break;
        case "MCA":
            $("#courses").html("<table class='table table-striped table-sm table-bordered'> <tbody> <tr> <td><strong>Semester 1</strong></td></tr><tr> <td>MCS011</td><td>MCS012</td><td>MCS013</td><td>MCS014</td><td>MCS015</td><td>MCSL016</td><td>MCSL017</td><tr> <td><strong>Semester 2</strong></td></tr><tr> <td>MCS021</td><td>MCS022</td><td>MCS023</td><td>MCS024</td><td>MCSL025</td></tr><tr> <td><strong>Semester 3</strong></td></tr><tr> <td>MCS031</td><td>MCS032</td><td>MCS033</td><td>MCS034</td><td>MCS035</td><td>MCSL036</td></tr><tr> <td><strong>Semester 4</strong></td></tr><tr> <td>MCS041</td><td>MCS042</td><td>MCS043</td><td>MCS044</td><td>MCSL045</td></tr><tr> <td><strong>Semester 5</strong></td></tr><tr> <td>MCS051</td><td>MCS052</td><td>MCS053</td><td>MCSL054</td><td>MCSE003</td><td>MCSE004</td><td>MCSE011</td></tr><tr> <td><strong>Semester 6</strong></td></tr><tr> <td>MCSP060</td></tr></tbody></table>");
            break;
        default:
            $("#courses").html("We are working for this course analysis, please check back soon..!!");
            return;
    }
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: "profile.php",
        data: {program: programme, form_id: form_id, type: "fetch"},
        success: function (data) {
            data = JSON.parse(data);
            var len = data.length - 2;
            for (i = 2; i <= len; i++)
                course_color(data[i][0], data[i][7], data[i][10]);
            getErrors();
            draw_chart();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
}

function course_color(subject, status, marks) {
    $('#courses table tr').each(function () {
        $.each(this.cells, function (index, value) {
            if ($(value).html() === subject) {
                if (status === "Completed")
                    $(value).attr("class", "bg-success attended");
                else if (status === "Not Completed")
                    $(value).attr("class", "bg-danger attended");
                $(value).attr("data-value", marks);
            }
        });
    });
}

function get_chart_values() {
    var percentages = new Array(0);
    var semester = 0;
    $('#courses table tr').each(function (i, v) {
        var sum = 0;
        var total = 0;
        $.each(this.cells, function (index, value) {
            if ($(value).hasClass("attended")) {
                sum += $(value).data("value");
                total++;
            }
        });
        semester++;
        if (sum) {
            percentages[semester / 2] = (sum / total).toFixed(2);
        } else {
            percentages[semester / 2] = 0;
        }
    });
    return percentages;
}

function table_flow() {
    if ($(window).width() < 768) {
        $('tr').each(function () {
            $('<tr>').insertAfter(this).append($('>:gt(3)', this));
        });
    }
}

function draw_chart() {
    $("head").append("<link>");
    var css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
    });
    $.ajax({
        url: 'https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js',
        dataType: "script",
        async: false,
        success: function () {
            var percentages = get_chart_values();
            table_flow();
            var data = {
                labels: ['0', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                series: [{
                    name: "series-a",
                    data: [0, percentages[1], percentages[2], percentages[3], percentages[4], percentages[5], percentages[6]]},
                    {name: "series-b", data: [0, 50, 50, 50, 50, 50, 50]}
                ]};
            var chart = new Chartist.Line('.ct-chart', data, {low: 0, showArea: true});
            var seq = 0,
            delays = 80,
            durations = 500;
            chart.on('created', function (data) {
                seq = 0;
                var grids = data.svg.querySelector('.ct-grids');
                var chartRect = data.chartRect;
                rect = grids.elem('rect', {
                    x: chartRect.x1,
                    y: chartRect.y2,
                    width: chartRect.width(),
                    height: chartRect.height(),
                }, 'ct-fill-rect', true);
            });
            chart.on('draw', function(data) {
                seq++;
                if(data.type === 'grid') {
                    // Using data.axis we get x or y which we can use to construct our animation definition objects
                    var pos1Animation = {
                      begin: seq * delays,
                      dur: durations,
                      from: data[data.axis.units.pos + '1'] - 30,
                      to: data[data.axis.units.pos + '1'],
                      easing: 'easeOutQuart'
                    };

                    var pos2Animation = {
                      begin: seq * delays,
                      dur: durations,
                      from: data[data.axis.units.pos + '2'] - 100,
                      to: data[data.axis.units.pos + '2'],
                      easing: 'easeOutQuart'
                    };
                    var animations = {};
                    animations[data.axis.units.pos + '1'] = pos1Animation;
                    animations[data.axis.units.pos + '2'] = pos2Animation;
                    animations['opacity'] = {
                      begin: seq * delays,
                      dur: durations,
                      from: 0,
                      to: 1,
                      easing: 'easeOutQuart'
                    };
                    data.element.animate(animations);
                }else if(data.type === 'point') {
                    data.element.animate({
                      x1: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                      },
                      x2: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                      },
                      opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'easeOutQuart'
                        }
                    });
                }else if(data.type === 'line') {
                    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                    data.element.animate({
                      opacity: {
                        // The delay when we like to start the animation
                        begin: seq * delays + 1000,
                        // Duration of the animation
                        dur: durations,
                        // The value where the animation should start
                        from: 0,
                        // The value where it should end
                        to: 1
                      }
                    });
                }
            });
        }
    });
}

function fetch_friends(eno, program, form_id) {
    $('.loading').hide();
    $('.loading').attr("class", "loading1");
    $.ajax({
        async: true,
        type: 'POST',
        url: "error_ajax.php",
        data: {eno: eno, program: program, form_id: form_id},
        success: function (data) {
            $("#friends_list").html(data);
        },
        error: function () {
        }
    });
    $('.loading1').attr("class", "loading");
}

function get_student_list() {
    var program = $("#program").val();
    var admit_year = $("#admit_year").val();
    var sc = $("#sc").val();
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: 'student-list.php',
        data: {sc: sc, program: program, admit_year: admit_year, form_id: form_id},
        success: function (data) {
            $("#student_list").html(data);
            getErrors();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
}

function submit_feedback(username, email, subject, msg, captcha, form_id) {
    $.ajax({
        async: true,
        type: 'POST',
        url: 'index.php',
        data: {username: username, email: email, subject: subject, msg: msg, captcha: captcha, id: '1', form_id: form_id},
        success: function (data) {
            $("#feedback_result").html(data);
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    $('#feedback_form')[0].reset();
}

function subscribe(email) {
    $.ajax({
        type: 'POST',
        url: 'index.php',
        data: {email: email, id: '2'},
        success: function (data) {
            $("#subscribe_result").html(data);
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    $('#subscribe_form')[0].reset();
}

function fetch_projects(p_type, form_id) {
    $.ajax({
        type: 'POST',
        url: 'project-and-synopsis.php',
        data: {form_id: form_id, p_type: p_type, flag : 1},
        success: function (data) {
            $("#projects").html(data);
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    getErrors();
}

function update_projects_counter(x){
    var form_id = $("#form_id").val();
    var project_id = $(x).data("id");
    $.ajax({
        type: 'POST',
        url: 'project-and-synopsis.php',
        data: {form_id : form_id, project_id : project_id, flag : 2},
        success: function(data){
            window.location.href = data;
        },
        error: function(){
        }
    });
}

function get_playlist_videos(playlist_id) {
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: 'videos.php',
        data: {form_id: form_id, flag: '1', playlist_id: playlist_id},
        success: function (data) {
            $("#playlist_videos").html(data);
            new Blazy();
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        }
    });
    getErrors();
}

function get_current_video(video_id) {
    $("#video").html("<iframe src='https://www.youtube.com/embed/" + video_id + "?autoplay=0&modestbranding=1&enablejsapi=1'></iframe>");
    var form_id = $("#form_id").val();
    $.ajax({
        type: 'POST',
        url: 'videos.php',
        data: {form_id: form_id, flag: '2', video_id: video_id},
        success: function (data) {
            $("#video_data").html(data["video_data"]);
            $("#video_comments").html(data["video_comments"]);
        },
        error: function () {
            alert("Oops!! Something went wrong, Please try again.");
        },
        dataType: "json"
    });
    getErrors();
}