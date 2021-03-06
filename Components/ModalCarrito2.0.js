Vue.component('modal-carrito-table', {
  template: `
<div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCart">Launch modal</button>

  <!-- Modal: modalCart -->
  <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!--Header-->
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Tu pedido</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <!--Body-->
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item " v-for= "item of $store.state.itemsSeleccionados">
              <div class="row">
                <div class="col-3 text-center align-middle"><label class="secondary-font-md">{{item.name}}</label></div>
                <div class="col-3 text-center align-middle"><label class="secondary-font-md ">{{price(item)}}</label></div>
                <div class="col-6 text-center align-middle">
                  <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-grey btn-xs-amount " @click = "restar(item)"><i class="fas fa-minus"></i></button>
                    <button type="button" class="btn btn-outline-grey  btn-xs-amount ">{{cantidad(item.id)}}</button>
                    <button type="button" class="btn btn-grey btn-xs-amount" @click = "sumar(item)"><i class="fas fa-plus"></i></button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- <table class="table table-hover">
          <tbody>
            <tr>
              <td class="align-middle  secondary-font-md"> IPA</td>
              <td class="align-middle subFont"> $125.00</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-grey btn-xs-amount "><i class="fas fa-plus"></i></button>
                  <button type="button" class="btn btn-outline-grey  btn-xs-amount " >150</button>
                  <button type="button" class="btn btn-grey btn-xs-amount"><i class="fas fa-minus"></i></button>
                </div>
              </td>
            </tr>
            <tr v-for= "item of $store.state.itemsSeleccionados" >
              <td>{{item.name}}</td>
              <td>{{price(item)}}</td>
              <td>
                <div>
                    <div class="def-number-input number-input safari_only mb-0 w-80">
                      <button  
                        class="minus" @click = "restar(item)"></button>
                      <input class="quantity" min="0" name="quantity" :value= cantidad(item.id) type="number" disabled>
                      <button 
                        class="plus" @click = "sumar(item)"></button>
                    </div>
                  </div>
                 
              </td>
            </tr>
            
          </tbody>
        </table> -->

        </div>
        <!--Footer-->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Cancelar</button>
          <button class="btn btn-primary btn-md" @click="buildOrder()">Enviar pedido</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal: modalCart -->
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