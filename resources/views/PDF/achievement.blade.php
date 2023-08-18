<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
        <div class="">
            <div class="row">
                <div class="col-auto d-flex align-items-center">
                    <div class="ml-2">
                        <div class="font-weight-bold text-sm">PT. Arai Rubeer Seal Indonesia</div>
                        <div class="text-xs">Packaging Section</div>
                    </div>
                </div>
            </div>
            
            <h3 class="text-center mt-3">Detail Achievement Packaging</h3>
            <div class="font-weight-bold mb-3">Period: {{ $data['from_date'] }} - {{ $data['to_date'] }}</div>
            <table class="table text-sm">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Shift</th>
                        <th scope="col">NPK</th>
                        <th scope="col">Name</th>
                        <th scope="col">Drw. No.</th>
                        <th scope="col">Lot No.</th>
                        <th scope="col">Total Lot</th>
                        <th scope="col">Qty/parcel</th>
                        <th scope="col">Start</th>
                        <th scope="col">Finish</th>
                        <th scope="col">Qty (pcs)</th>
                        <th scope="col">Target (pcs)</th>
                        <th scope="col">Achievement (%)</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($achievements as $index => $achievement)
                        @php
                            $start = new \Carbon\Carbon($achievement->start);
                            $finish = new \Carbon\Carbon($achievement->finish);
                            $diffInMinutes = $finish->diffInMinutes($start);
                            $target = $achievement->target->quantity;
                            $minutes =0;
                            if($achievement->shift === 1){
                                $minutes = 415;
                            }else{
                                $minutes = 395;
                            }
                            $actualTarget = ($diffInMinutes/$minutes) *$target;
                        @endphp
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $achievement->date }}</td>
                            <td>{{ $achievement->shift }}</td>
                            <td>{{ $achievement->user->npk }}</td>
                            <td>{{ $achievement->user->fullname }}</td>
                            <td>{{ $achievement->product->drw_no }}</td>
                            <td>{{ $achievement->product_lot }}</td>
                            <td>{{ $achievement->total_lot }}</td>
                            <td>{{ number_format($achievement->target->parcel->quantity, 0, ',', ',') }}</td>
                            <td>{{ substr($achievement['start'], 0, 5)}}</td>
                            <td>{{ substr($achievement['finish'], 0, 5)}}</td>
                            <td>{{ number_format($achievement->qty, 0, ',', ',') }}</td>
                            <td>{{ number_format($actualTarget, 0, ',', ',') }}</td>
                            <td>{{ round(($achievement->qty / $actualTarget) * 100) }}%</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    </body>
</html>
