<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>Laravel Highcharts Demo</title>
</head>
<body>
    <h1>Highcharts in Laravel Example</h1>
    <div id="container"></div>
</body>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script type="text/javascript">
   var data = <?php echo json_encode($data)?>;

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'New User Growth, 2020'
    },
    subtitle: {
        text: 'Source: possitronx.io'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Number of New Data'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'New Data',
        data: data
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});


</script>
</html>
