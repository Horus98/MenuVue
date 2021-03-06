Vue.component('modal-carrito', {
    template: `
        <div>
       
        
        <!-- Full Height Modal Right -->
        <div class="modal fade top" id="fullHeightModalRight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        
        <!-- Add class .modal-full-height and then add class .modal-right (or other classes from list above) to set a position to the modal -->
        <div class="modal-dialog modal-full-height modal-top" role="document">
        
        
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title w-100" id="myModalLabel">Sus pedidos</h4>
                <button type="button" data-toggle="modal" data-target="#modalConfirmDelete" class="btn btn-outline-pink  wave-effect" >
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </button>
            </div>
            <div class="modal-body">
            <ul class="list-group">
                <li v-for= "item of $store.state.itemsSeleccionados" :key= "item.id" class="list-group-item">
                    
                    <!-- Falta la imagen, cuando se tenga la informacion en la API, cambiar a item.image -->
                        <img src= "https://images.crateandbarrel.com/is/image/Crate/SpiegelauIPAGlass18ozSHS16" alt="imagen item" height="60px" width="60px" style=" object-fit: cover;">
                        <span class="subFont ml-3 justify-content-center ">{{item.name}} 
                            <span class="small-font">
                                <button type="button" @click = "restar(item)" class="btn btn-pink btn-sm btn-circle mb-3" ><i class="fas fa-minus"></i></button> 
                                {{cantidad(item.id)}}
                                <button type="button " @click = "sumar(item)" class="btn btn-lime btn-sm btn-circle mb-3"><i class="fas fa-plus"></i></button>
                                {{price(item)}}</span>
                        </span>
                    
                </li>
                <li class = "list-group-item">
                    <div class="md-form">
                        <textarea id="form7" v-model = "observations" class="md-textarea form-control" rows="2"></textarea>
                        <label for="form7">Observaciones..</label>
                    </div>
                </li>
            </ul>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-pink btn-md" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-lime accent-4 text-dark btn-md" data-dismiss="modal" @click="buildOrder()" >Realizar Pedido</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    `,
    data() {
        return {
            items: store.state.cantidadItemSeleccionado,
            observations: "",
            
        }
    },
    methods: {
        clear() {
            this.observations = "";
            store.commit('clear');
        },
        cantidad(id) {
            return store.state.cantidadItemSeleccionado.get(id);
        },
        price(item) {
            let precio = this.cantidad(item.id) * item.price;
            precio = new Intl.NumberFormat("de-DE").format(precio);
            return "$" + precio;
        },
        sumar(item) {
            store.commit('agregar', item);
        },
        restar(item) {
            let cantidad = this.cantidad(item.id);
            if (cantidad > 0)
                store.commit('quitar', item);
        },
        buildOrder() {
            let order = {
                "table": 1,
                "items": Array.from(store.state.cantidadItemSeleccionado.keys()),
                "quantities": Array.from(store.state.cantidadItemSeleccionado.values()),
                "comments" : this.observations,
            };

            console.log(order);
            axios.post('http://127.0.0.1:8000/api/orders/', order, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        this.notify();
                        this.clear();
                    };
                }).catch(e => {
                    console.log(e);
                });
        },
        notify() {
            swal("Tu pedido ha sido enviado!", "Momento de esperar!", "success", {
                timer: 3000
            });
        }
    },
    
});