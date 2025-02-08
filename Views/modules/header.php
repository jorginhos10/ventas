<?php
require_once dirname(__FILE__, 3) . '/Config/config.php';
date_default_timezone_set(ZONA_HORARIA);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title><?php echo SYSTEMNAME;
            ?></title>
    <!-- General CSS Files -->
    <link rel="stylesheet" href="Assets/css/app.min.css">

    <!-- DATATABLES -->
    <!-- Template CSS -->
    <link rel="stylesheet" href="Assets/bundles/select2/dist/css/select2.min.css">
    <link rel="stylesheet" href="Assets/bundles/datatables/datatables.min.css">
    <link rel="stylesheet" href="Assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="Assets/css/style.css">
    <link rel="stylesheet" href="Assets/css/components.css">

    <link rel="stylesheet" href="Assets/css/custom.css">

    <link rel='shortcut icon' type='image/x-icon' href='Assets/img/favicon.ico' />
</head>

<body class="light theme-black dark-sidebar">
<!--inicio popup tiendas-->
<?php include "popUp.php"; ?>
<!--inicio popup tiendas-->
    <div class="loader"></div>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar navbar-header">
                <div class="form-inline mr-auto">
                    <ul class="navbar-nav mr-3">
                        <li>
                            <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg collapse-btn">
                                <i data-feather="align-justify"></i>
                            </a>
                        </li>
                        <li>
<!--clase eliminada del a = fullscreen-btn-->
                            <a href="#" class="nav-link nav-link-lg btn-popUp-tiendas">
                                <i data-feather="search"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav navbar-right">
                    <!-- <li class="dropdown dropdown-list-toggle">
                        <a href="#" data-toggle="dropdown" class="nav-link notification-toggle nav-link-lg"><i
                                data-feather="bell"></i>
                            <span class="badge headerBadge2">
                                1 </span> </a>
                        <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">

                            <a href="#" class="dropdown-item">
                                <span class="dropdown-item-icon bg-orange text-white">
                                    <i class="fas fa-bell"></i>
                                </span>
                                <span class="dropdown-item-desc"> Sotck agotado</span>
                            </a>

                        </div>
                    </li>-->
                    <li class="dropdown"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <img alt="image" src="Assets/img/users/<?php echo $_SESSION['imagen']; ?>" class="user-img-radious-style"> <span class="d-sm-none d-lg-inline-block"></span></a>
                        <div class="dropdown-menu dropdown-menu-right pullDown">
                            <div class="dropdown-title"><?php echo $_SESSION['nombre']; ?></div>
                            <a href="profile" class="dropdown-item has-icon"> <i class="far
										fa-user"></i> Perfil
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="salir" class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt"></i>
                                Cerrar sesión
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>