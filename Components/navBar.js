Vue.component('nav-bar',{
    template: `
    <nav id="navbar-example2" class="navbar fixed-top navbar-expand-lg navbar-dark elegant-color">
    <a class="navbar-brand" href="#">Mulaika</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#presentacion">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#carta">Menú</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="#">Ver Pedido</a>
            </li>
            <!-- Dropdown -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Llamar Mozo</a>
                <div class="dropdown-menu dropdown-elegant" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Solicitar Cuenta</a>
                    <a class="dropdown-item" href="#">Solicitar Ayuda</a>
                </div>
            </li>
        </ul>
    </div>
</nav>
    `
});