<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Helper function to sanitize form inputs
    function sanitize_input($data)
    {
        $data = trim( $data );
        $data = stripslashes( $data );
        $data = htmlspecialchars( $data );
        return $data;
    }

    // Sanitize form data
    $name = sanitize_input( $_POST['name'] );
    $email = sanitize_input( $_POST['email'] );
    $phone = sanitize_input( $_POST['phone'] );
    $subject = sanitize_input( $_POST['subject'] );
    $message = sanitize_input( $_POST['message'] );

    // Admin email (change this to your admin's email)
    $admin_email = "preet90310@gmail.com";

    // Email validation
    if (!filter_var( $email, FILTER_VALIDATE_EMAIL )) {
        echo "Invalid email format!";
        exit;
    }

    // Honeypot field (invisible field added to the form)
    if (!empty($_POST['honeypot'])) {
        // If this field is filled, it’s likely a bot
        exit("Spam detected!");
    }

    // Email headers validation to prevent header injection
    if (preg_match( "/(bcc:|cc:|to:)/i", $email )) {
        exit("Invalid input in email header.");
    }

    // Email subject for admin
    $admin_subject = "New Services Query";

    // Construct email message in HTML format (admin version)
    $admin_message = "
    <html>
    <head>
    <title>New Cake Order</title>
    <style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    </style>
    </head>
    <body>
    <h2>Services Query</h2>
    <table>
    <tr><th>Field</th><th>Value</th></tr>
    <tr><td>Name</td><td>$name</td></tr>
    <tr><td>Email</td><td>$email</td></tr>
    <tr><td>Phone</td><td>$phone</td></tr>
    <tr><td>Subject</td><td>$subject</td></tr>
    <tr><td>Message</td><td>$message</td></tr>
    </table>
    </body>
    </html>
    ";

    // Set headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


    // Prevent spam by setting a time limit between submissions
    session_start();
    $timeLimit = 60; // 60 seconds between form submissions
    if (isset($_SESSION['last_submit']) && (time() - $_SESSION['last_submit']) < $timeLimit) {
        exit("You are submitting too quickly. Please wait a moment.");
    }
    $_SESSION['last_submit'] = time();

    // Send email to admin
    if (mail( $admin_email, $admin_subject, $admin_message, $headers )) {
        // Construct "Thank You" email message for the user
        $user_subject = "Thank You!";
        $user_message = "
        <html>
        <head>
        <title>Thank You</title>
        </head>
        <body>
        <h2>Dear $name,</h2>
        <p>Thank you for submitting your query. We will contact you soon!</p>
        <p>Best regards,<br>ClimateGrip Team</p>
        </body>
        </html>
        ";

        // Send email to the user
        mail( $email, $user_subject, $user_message, $headers );

        // Redirect to thank you page
        header( "Location: https://www.climategrip.com/thankyou.html" );
        exit();
    } else {
        echo "Failed to send email.";
    }
}
<?php
// Configure Gmail SMTP settings
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_username = 'your_gmail_username@gmail.com'; // Replace with your Gmail address
$smtp_password = 'your_gmail_app_password'; // Replace with your Gmail app password

// Set up PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

function sendEmail($to, $subject, $message) {
    global $smtp_host, $smtp_port, $smtp_username, $smtp_password;

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $smtp_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_username;
        $mail->Password   = $smtp_password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $smtp_port;

        // Recipients
        $mail->setFrom('info@exampl.com', 'ClimateGrip Team');
        $mail->addAddress($to);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

// Send email to admin
if (sendEmail($admin_email, $admin_subject, $admin_message)) {
    // Send email to the user
    sendEmail($email, $user_subject, $user_message);

    // Redirect to thank you page
    header("Location: https://www.climategrip.com/thankyou.html");
    exit();
} else {
    echo "Failed to send email.";
}
?>