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
                <button type="button" @click=" $store.commit('clear'); " class="btn btn-outline-pink  wave-effect" >
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </button>
            </div>
            <div class="modal-body">
            <ul class="list-group">
                <li v-for= "item of $store.state.itemsSeleccionados" :key= "item.id" class="list-group-item">
                    <div>
                        <img :src= "item.imagen" alt="imagen item" height="60px" width="60px" style=" object-fit: cover;">
                        <span class="subFont ml-3 justify-content-center ">{{item.nombre}} 
                            <span class="small-font">
                                <button type="button" @click = "$store.commit('quitar',item)" class="btn btn-red btn-sm btn-circle mb-3" ><i class="fas fa-minus"></i></button> 
                                {{cantidad(item.id)}}
                                <button type="button " @click = "$store.commit('agregar',item)" class="btn btn-lime btn-sm btn-circle mb-3"><i class="fas fa-plus"></i></button>
                                $2500</span>
                        </span>
                    </div>
                </li>
            </ul>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-pink btn-md" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-lime accent-4 text-dark btn-md">Realizar Pedido</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    `,
    data(){
        return{
          items: store.state.cantidadItemSeleccionado,
        }
    },
    methods:{
        cantidad(id){
            return this.items.get(id);
        }
    },
    
});