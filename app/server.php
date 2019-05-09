<?php
if (isset($_POST['n']) && isset($_POST['e']) && isset($_POST['m']) && isset($_POST['c'])) {

    $n = trim($_POST['n']);
    $e = trim($_POST['e']);
    $m = nl2br($_POST['m']);

    $e = filter_var($e, FILTER_SANITIZE_EMAIL);
    $n = htmlentities($n);
    $m = htmlentities($m);

    // Validate data first
    if (!filter_var($e, FILTER_VALIDATE_EMAIL) || strlen($e) > 50) {
        http_response_code(403);
        $response['error']['email'] = "A valid email is required";
    }
    if (empty($n)) {
        http_response_code(403);
        $response['error']['name'] = 'Name is required ';
    }

    echo json_encode($response);

    // Process to emailing if forms are correct
    if (!isset($response['error']) || $response['error'] === '') {

        $to = "hello@arsdata.io";
        $subject = 'ARS Data Contact Form Message';

        $message = '<b>Name:</b> ' . $n . ' <br><b>Email:</b> ' . $e . ' <p>' . $m . '</p>';
        $headers = "From: $n\n";
        $headers .= "MIME-Version: 1.0\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\n";
        if (mail($to, $subject, $message, $headers)) {
            echo "success";
        } else {
            echo "The server failed to send the message. Please try again later.";
        }
    } else {
        http_response_code(403);
    }

    $response['email'] = $email;
    $response['form'] = 'submit_message';
}
