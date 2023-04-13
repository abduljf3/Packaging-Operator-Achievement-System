<!DOCTYPE html>
<html>
<head>
    <title>Laporan Rekapitulasi</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <style type="text/css">
        table tr td,
        table tr th{
            font-size: 9pt;
        }
    </style>
    <center>
        <h1>Laporan Rekapitulasi</h1>
		<h5>Rekapitulasi dari {{ $from }} sampai {{ $to }}</h5>
    </center>

    <table class='table table-bordered'>
        <thead>
            <tr>
                <th>No</th>
                <th>Drawing Number</th>
                <th>LOT</th>
                <th>Qty</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            @php $i=1 @endphp
            @foreach($achievements->groupBy('drw_no') as $drw_no => $group)
            <tr>
                <td>{{ $i++ }}</td>
                <td>{{ $drw_no }}</td>
                <td>{{ $group->sum('total_lot') }}</td>
                <td>{{ $group->sum('qty') }}</td>
                <td>{{ $group->first()->product->product_type }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>