<?php

$data = array();

if (is_array($_FILES) && count($_FILES) > 0) {
    $error = false;
    $files = array();

    $uploaddir = './uploads/';
    foreach($_FILES as $file) {
        if(move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))) {
            $files[] = $uploaddir . $file['name'];
        } else {
            $error = true;
        }
    }

    if ($error) {
        $data = [
            'error' => true,
            'message' => 'There was an error while uploading your file.',
        ];
    } else {
        $data = [
            'message' => 'Your files have been successfully uploaded.',
        ];
    }
} else {
    $data = [
        'error' => true,
        'message' => 'No file to upload.',
    ];
}

echo json_encode($data);
