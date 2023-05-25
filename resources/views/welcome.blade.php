<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link href="{{asset('/assets/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{asset('/assets/css/sb-admin-2.min.css')}}" rel="stylesheet">


    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @vite('resources/js/app.jsx', 'vendor/courier/build')
</head>

<body>
@viteReactRefresh
@vite('resources/js/app.jsx')

<div id="root"></div>

<script src="{{asset('/assets/vendor/jquery/jquery.min.js')}}"></script>

<script src="{{asset('/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>

<!-- Core plugin JavaScript-->
<script src="{{asset('/assets/vendor/jquery-easing/jquery.easing.min.js')}}"></script>

<!-- Custom scripts for all pages-->
<script src="{{asset('/assets/js/sb-admin-2.min.js')}}"></script>

<!-- Page level plugins -->
<script src="{{asset('/assets/vendor/chart.js/Chart.min.js')}}"></script>

<!-- Page level custom scripts -->
<script src="{{asset('/assets/js/demo/chart-area-demo.js')}}"></script>
<script src="{{asset('/assets/js/demo/chart-pie-demo.js')}}"></script>
<script>

    if (window.location.pathname == '/login' || window.location.pathname == '/signup') {
        window.location.replace('/')
    }

</script>
</body>
</html>
