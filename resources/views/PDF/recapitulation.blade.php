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
                    <img src="{{ asset('perusahaan.png') }}" alt="Logo ARSI" class="img-fluid" style="height: 40px;">
                    <div class="ml-2">
                        <div class="font-weight-bold text-sm">PT. Arai Rubeer Seal Indonesia</div>
                        <div class="text-xs">Packaging Section</div>
                    </div>
                </div>
            </div>
            
            <h3 class="text-center mt-3">Recapitulation Achievement Report</h3>
            <div class="text-gray-800 font-semibold w-full mb-3">Period : {{ $data['from_date'] }} - {{ $data['to_date'] }}</div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">NPK</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Achievement (pcs)</th>
                        <th scope="col">Total Target (pcs)</th>
                        <th scope="col">Achievement (%)</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($userAchievements as $index => $achievement)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $achievement['user']['npk'] }}</td>
                            <td>{{ $achievement['user']['fullname'] }}</td>
                            <td>{{ number_format($achievement['totalAchievement'], 0, ',', '.') }}</td>
                            <td>{{ number_format($achievement['totalTarget'], 0, ',', '.') }}</td>
                            <td>{{ $achievement['achievementPercentage'] }}</td>
                        </tr>
                    @endforeach


                </tbody>
            </table>
        </div>
    </body>
</html>
