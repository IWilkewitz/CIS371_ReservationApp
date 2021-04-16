<template>
  <div>
    <div>
      <h1>Local Favorites </h1>
      <div>
        
      </div>
      <div id="restCards" v-for="(z, pos) in restaurants" :key="pos">
        <img :src="z.picture" alt="" style="width:300px;height:200px;" />
        <div id="restInfo">
          <h2>{{ z.name }}</h2>
          <h3>Address: {{ z.address }}</h3>
          <h3>Phone Number: {{ z.phone }}</h3>
          <h3>Cuisine: {{ z.cuisine }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FirebaseAuth } from "@firebase/auth-types";
import {
  FirebaseFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
@Component
export default class Home extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: any;
  private restaurants: any[] = [];

  

search(): void {
    var formInput= "west"
    
    console.log(formInput)
}

  mounted(): void {
    this.$appDB
      .collection("restaurants")
      .orderBy("name")
      .onSnapshot((qs: QuerySnapshot) => {
        this.restaurants.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const restData = qds.data();
            this.restaurants.push({
              name: restData.name,
              cuisine: restData.cuisine,
              address: restData.address,
              phone: restData.phone,
              picture: restData.picture,
            });
          }
        });
      });
  }
}
</script>

<style>
#restCards {
  margin: 1em;
  display: inline-block;
  flex-direction: column;
}

#restCards h3 {
  text-align: left;
}

#restInfo {
  text-align: left;
}

img {
  vertical-align: middle;
}

form {
  display: inline-block;
  margin: 6em;
}
</style>
