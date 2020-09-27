<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action class="box" @submit.prevent="logar()">
                <div class="field">
                  <label for class="label">Login</label>
                  <div class="control has-icons-left">
                    <input
                      type="input"
                      placeholder="usuario"
                      class="input"
                      v-model="auth.usuario"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for class="label">Senha</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      class="input"
                      v-model="auth.password"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: {},
    };
  },

  methods: {
    logar() {
      var form = new FormData();
      form.append("grant_type", "password");
      form.append("username", this.auth.usuario);
      form.append("password", this.auth.password);

      var headers = {
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        authorization: "Basic cGVzcXVpc2VpOjEwMjAzMHBlc3F1aXNlaQ==",
      };
      this.$http
        .post(`${process.env.VUE_APP_BASE_URL}/oauth/token`, form, { headers })
        .then(
          (response) => {
            if (response.status === 200) {
              localStorage.setItem("user", JSON.stringify(response.body));
              this.$router.push("/pesquisa");
            }
          },
          () => {
            this.$buefy.toast.open({
              message: "Ops..Algo deu errado!",
              type: "is-danger",
            });
          }
        );
    },
  },
};
</script>

<style>
</style>