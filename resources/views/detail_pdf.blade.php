<!-- resources/views/sales.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Sales Report</h1>
        <canvas id="myChart"></canvas>
    </div>
@endsection

@section('scripts')
    <script>
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: {!! json_encode($labels) !!},
                datasets: [{
                    label: 'Sales',
                    data: {!! json_encode($data) !!},
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
@endsection
<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html>
    <head>
        <title>Laravel App</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    Laravel App
                </a>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>

        <script src="{{ asset('js/app.js') }}"></script>
        @yield('scripts')
    </body>
</html>
