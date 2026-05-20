<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    // Check if the file input exists in the $_FILES array
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        // Retrieve form data
        $fname = htmlspecialchars($_POST['fname']);
        $lname = htmlspecialchars($_POST['lname']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);
        $dob = htmlspecialchars($_POST['dob']);
        $gender = htmlspecialchars($_POST['gender']);
        $country = htmlspecialchars($_POST['country']);
        $cname = htmlspecialchars($_POST['cname']);
        $gpa = htmlspecialchars($_POST['gpa']);
        $cname2 = htmlspecialchars($_POST['cname2']);
        $gpa2 = htmlspecialchars($_POST['gpa2']);
        $income = htmlspecialchars($_POST['income']);
        $financial_aid = htmlspecialchars($_POST['financial_aid']);
        $fullname = "$fname $lname";

        // File upload handling
        $file = $_FILES['file'];
        $upload_dir = 'user-data/'; // Directory to store uploaded files
        
        // Define allowed file types
        $allowed_extensions = ['pdf', 'doc', 'docx'];

        // Create uploads directory if it doesn't exist
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        $file_tmp_path = $file['tmp_name'];
        $file_name = basename($file['name']);
        $file_extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        // Sanitize file name
        $file_name = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $file_name);
        
        // Validate file extension
        if (!in_array($file_extension, $allowed_extensions)) {
            echo "Invalid file type. Only .pdf and .doc files are allowed.";
            exit;
        }
        
        $file_path = $upload_dir . $file_name;

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($file_tmp_path, $file_path)) {

            // get host url
            $scheme = $_SERVER['REQUEST_SCHEME']; 
            $host = $_SERVER['HTTP_HOST']; 
            $theme_directory = 'unipix'; // Your theme directory name
            $full_url = $scheme . '://' . $host . '/' . $theme_directory . '/' . $file_path;

            // Prepare email
            $to = 'support@reactheme.com'; // Replace with your email
            $subject = 'New Application Submission from ' . $fullname;
            $message = "New application submitted:\n\n" .
                       "Applicant Name: $fullname\n" .
                       "Email: $email\n" .
                       "Phone: $phone\n" .
                       "Date of Birth: $dob\n" .
                       "Gender: $gender\n" .
                       "Country: $country\n" .
                       "College Name: $cname\n" .
                       "GPA: $gpa\n" .
                       "Current College Name: $cname2\n" .
                       "Current GPA: $gpa2\n" .
                       "Household Income: $income\n" .
                       "Applying for Financial Aid: $financial_aid\n\n" .
                       "Uploaded file: $full_url\n"; // Includes the path of the uploaded file

            // Email headers
            $headers = "From: $fullname <$email>\r\n" .
                       "MIME-Version: 1.0\r\n" .
                       "Content-Type: text/plain; charset=UTF-8\r\n";

            // Send the email
            if (mail($to, $subject, $message, $headers)) {
                echo "Application submitted successfully.";
            } else {
                echo "Failed to send email.";
            }
        } else {
            echo "Failed to move uploaded file.";
        }
    } else {
        echo "File upload error.";
        // Handle file upload error codes
        if (isset($_FILES['file'])) {
            $error = $_FILES['file']['error'];
            switch ($error) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    echo "File is too large.";
                    break;
                case UPLOAD_ERR_PARTIAL:
                    echo "File was only partially uploaded.";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    echo "No file was uploaded.";
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    echo "Missing a temporary folder.";
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    echo "Failed to write file to disk.";
                    break;
                default:
                    echo "File upload error.";
                    break;
            }
        } else {
            echo "File input 'file' is not set.";
        }
    }
} else {
    echo "Invalid request method.";
}
