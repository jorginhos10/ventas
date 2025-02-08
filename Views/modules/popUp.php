<?php
// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// nombre de las tiendas (asegúrate de que los nombres sean únicos)
$name_store_data = ["la pradera", "world pet", "san jose", "la juniorista", "7 de abril"];

// Configuración de las conexiones para cada base de datos
$databases = [
    [
        "name" => "jorginho_pradera",
        "user" => "jorginho_pradera",
        "password" => "jorginho10.",
        "host" => "localhost"
    ]
];

// Inicializar los resultados de los productos
$productos = [];
$error = ""; // Variable para almacenar mensajes de error

// Conectar a cada base de datos y verificar conexión
foreach ($databases as $index => $db) {
    $conn = new mysqli($db["host"], $db["user"], $db["password"], $db["name"]);

    if ($conn->connect_error) {
        $error = "No se encontró la base de datos con el nombre <strong>{$db['name']}</strong>";
        break; // Detener si hay un error de conexión
    }

    // Obtener productos con stock desde la tabla "articulo"
    $sql = "SELECT codigo, nombre AS descripcion, stock FROM articulo";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $codigo = $row['codigo'];

            if (!isset($productos[$codigo])) {
                $productos[$codigo] = [
                    "codigo" => $codigo,
                    "descripcion" => $row["descripcion"],
                    "stocks" => []
                ];
            }

            // Agregar stock de esta tienda
            $productos[$codigo]["stocks"]["tienda_" . ($index)] = $row["stock"];
        }
    }

    // Cerrar conexión
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta General</title>
    <style>
        .popUptiendas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5); /* Fondo gris semitransparente */
            display: none; /* Estado inicial de display none */
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .container-popUp {
            background: linear-gradient(to bottom, #ffffff, #f2f2f2);
            border-radius: 12px;
            padding: 20px;
            width: 100%;
            max-width: 715px;
            padding-bottom: 4rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 10000;
            transform: scale(0.5);
            transition: ease 0.2s all;
            height: 100%;
            max-height: 531px;
        }

        .table-container {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th, table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        table th {
            background-color: #f4f4f4;
            font-weight: bold;
        }

        table tbody tr:nth-child(even) {
            background-color: #f9f9f9; /* Gris suave para las filas pares */
        }

        table tbody tr:nth-child(odd) {
            background-color: #ffffff; /* Blanco para las filas impares */
        }

        table tbody tr:hover {
            background-color: #e0e0e0; /* Gris claro cuando se pasa el mouse por encima */
        }

        input[type="text"] {
            padding: 10px;
            margin-bottom: 20px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
        }
    </style>
</head>
<body>

    <!-- Popup -->
    <div class="popUptiendas" id="popupContainer">
        <div class="container-popUp">
            <div class="container mt-5">
                <h2 class="mb-4 text-center">Consulta General</h2>

                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $error; ?>
                    </div>
                <?php else: ?>
                    <div class="mb-3">
                        <input type="text" id="searchInput" class="form-control" placeholder="Buscar producto...">
                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th id="sortCodigo" style="cursor: pointer;">Código</th>
                                    <th id="sortDescripcion" style="cursor: pointer;">Descripción</th>
                                    <?php foreach ($name_store_data as $store_name): ?>
                                        <th style="cursor: pointer;"><?php echo $store_name; ?></th>
                                    <?php endforeach; ?>
                                </tr>
                            </thead>
                            <tbody id="productTable">
                                <?php foreach ($productos as $producto): ?>
                                    <tr>
                                        <td><?php echo $producto["codigo"]; ?></td>
                                        <td><?php echo $producto["descripcion"]; ?></td>
                                        <?php foreach ($name_store_data as $index => $store_name): ?>
                                            <td><?php echo $producto["stocks"]["tienda_" . ($index)] ?? 0; ?></td>
                                        <?php endforeach; ?>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>

                <?php endif; ?>
            </div>
        </div>
    </div>

    <script>
        // Función para buscar productos solo en Código y Descripción
        document.getElementById("searchInput").addEventListener("keyup", function () {
            let filter = this.value.toLowerCase();
            let rows = document.querySelectorAll("#productTable tr");
            rows.forEach(function (row) {
                let cells = row.getElementsByTagName("td");
                let found = false;

                // Buscar solo en las primeras dos columnas: Código y Descripción
                if (cells[0].innerText.toLowerCase().includes(filter) || cells[1].innerText.toLowerCase().includes(filter)) {
                    found = true;
                }

                row.style.display = found ? "" : "none";
            });
        });
    </script>

</body>
</html>
