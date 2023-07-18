<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
<body>
	<div class="row">
        <div class="col-auto d-inline-flex align-items-center">
            <img src="{{ asset('perusahaan.png') }}" alt="Logo ARSI" class="img-fluid" style="height: 40px;">
            <div class="ml-2">
                <div class="font-weight-bold text-sm">PT. Arai Rubeer Seal Indonesia</div>
                <div class="text-xs">Packaging Section</div>
            </div>
        </div>
    </div>
    
    <h3 class="text-center mt-3">Data Products</h3>
	<table class='table table-bordered'>
		<thead>
			<tr>
				<th class="scope">No</th>
				<th class="scope">Drw. No.</th>
				<th class="scope">Product Name</th>
				<th class="scope">Type</th>
				<th class="scope">Target (pcs)</th>
				<th class="scope">Cust. Code</th>
				<th class="scope">Cust. Name</th>
			</tr>
		</thead>
		<tbody>
			@php $i=1 @endphp
			@foreach($products as $p)
			<tr>
				<td>{{ $i++ }}</td>
				<td>{{$p->drw_no}}</td>
				<td>{{$p->product_name}}</td>
				<td>{{$p->product_type}}</td>
				<td>{{$p->target}}</td>
				<td>{{$p->customer->customer_code}}</td>	
				<td>{{$p->customer->customer_name}}</td>	
			</tr>
			@endforeach
		</tbody>
	</table>
 
</body>
</html>