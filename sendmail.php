<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail-> Charset ='UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('businessTravel@mail.ru','Забронировать акционный тур');
$mail->addAddress('janemoulen@mail.ru');
$mail->Subject = 'Хочу забронировать акционный тур!';

$body = '<h1>Добрый день! Хочу получить информацию по акционному туру. </h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>Email:</strong>'.$_POST['email'].'</p>';
}
//Отправка
if(!$mail->send()){
  $message = 'Ошибка';
}else{
  $message = 'Данные отправлены!';
}
$response = ['message' => $message];
header('Content-type:application/json');
echo json_encode($response);
?>
