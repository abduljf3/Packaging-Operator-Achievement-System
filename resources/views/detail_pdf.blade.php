<!DOCTYPE html>
<html>
<head>
	<title>Laporan Detail</title>
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
        <h1>Laporan Detail</h1>
	</center>
 
	<table class='table table-bordered'>
		<thead>
			<tr>
				<th>No</th>
				<th>Date</th>
				<th>Shift</th>
				<th>Group</th>
				<th>Drw_no</th>
				<th>Type</th>
				<th>Operator_Name</th>
				<th>Lot</th>
				<th>Qty</th>
				<th>Remarks</th>
			
			</tr>
		</thead>
		<tbody>
			@php $i=1 @endphp
			@foreach($achievements as $p)
			<tr>
				<td>{{ $i++ }}</td>
				<td>{{$p->date}}</td>
				<td>{{$p->shift}}</td>
                <td>{{$p->user->group}}</td>
				<td>{{$p->drw_no}}</td>
				<td>{{$p->product->product_type}}</td>
				<td>{{$p->user->fullname}}</td>
				<td>{{$p->total_lot}}</td>
				<td>{{$p->qty}}</td>
				<td>{{$p->remarks}}</td>
	
			</tr>
			@endforeach
		</tbody>
	</table>
 
</body>
</html>