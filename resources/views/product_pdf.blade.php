<!DOCTYPE html>
<html>
<head>
	<title>Daftar Product</title>
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
        <h1>Daftar Product</h1>
	</center>
 
	<table class='table table-bordered'>
		<thead>
			<tr>
				<th>No</th>
				<th>Drawing Number</th>
				<th>Product Name</th>
				<th>Customer Id</th>
				<th>Customer Name</th>
				<th>Target</th>
			
				
			
			</tr>
		</thead>
		<tbody>
			@php $i=1 @endphp
			@foreach($products as $p)
			<tr>
				<td>{{ $i++ }}</td>
				<td>{{$p->drw_no}}</td>
				<td>{{$p->product_name}}</td>
           
			
		
			
				<td>{{$p->customer_id}}</td>
				<td>{{$p->customer_name}}</td>
				<td>{{$p->target}}</td>
	
			</tr>
			@endforeach
		</tbody>
	</table>
 
</body>
</html>