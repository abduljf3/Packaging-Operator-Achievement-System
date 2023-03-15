<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel 9 CRUD Tutorial Exampsle</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" >
</head>

<body>
    <div class="container mt-2">
        <div class="row">
            <div class="col-lg-12 margin-tb">
                <div class="pull-left">
                    <h2>Laravel 9 CRUD Example Arhivmen</h2>
                </div>
                <div class="pull-right mb-2">
                    <a class="btn btn-success" href="{{ route('archivemenyss.create') }}"> Create Archivemenyy</a>
                </div>
            </div>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>S.No</th>   <th>S.Nsado</th>
                    <th>Archivemenyy Name</th>
                    <th>Archivemenyy Email</th>
                    <th>Archivemenyy Address</th>
                    <th width="280px">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($archivemenyss as $Archivemenyy)
                    <tr>
                        <td>{{ $Archivemenyy->id }}</td><td>{{ $Archivemenyy->id }}</td>
                        <td>{{ $Archivemenyy->name }}</td>
                        <td>{{ $Archivemenyy->email }}</td>
                        <td>{{ $Archivemenyy->address }}</td>
                        <td>
                            <form action="{{ route('archivemenyss.destroy',$Archivemenyy->id) }}" method="Post">
                                <a class="btn btn-primary" href="{{ route('archivemenyss.edit',$Archivemenyy->id) }}">Edit</a>
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
            </tbody>
        </table>
        {!! $archivemenyss->links() !!}
    </div>
</body>
</html>