<template>
    <div id="cotter-block">
        <div id="cotter-form-container"></div>
        <div v-show="success" id="cotter-verify-block">
            <button @submit.prevent="verifyCotter" id="verify-button">Verify</button>
            <pre> 
                {{ payloadString }}
            </pre>
       
        </div>
    </div>
</template>


<script>
import Cotter from 'cotter';
import CotterIdentity from 'cotter-token-js';

export default {
    name: 'cotter-form',
    data() {
        return {
            success: false,
            payload: null,
            payloadString: null,
            validToken: false,
        }
    },
    mounted () {
        console.log("this success: ", this.success);

        var config = {
            ApiKeyID: "28c090a0-6067-457d-976a-b0ac664f05fc",
            Type: "EMAIL",
            ContainerID: "cotter-form-container",
            SkipRedirectURL: true,
            IdentifierField: "email",
            OnSuccess: payload => {
                this.success = true;
                this.payload = payload;
                this.payloadString = JSON.stringify(payload, null);
            },
            OnError: (error) => {
                console.log(error);
            }
        };

        var cotter = new Cotter(config);
        cotter.showForm();
    },
    methods: {
        verifyCotter() {
            var cotterIdentity = new CotterIdentity(this.payload.token);
            this.validToken = cotterIdentity.validate();
        },
    },

}
</script>

<style scoped>
    #cotter-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        overflow: scroll;
        padding: 20px 0px;
    }

    #verify-button {
        width: 300px;
    }

    pre {
        word-wrap: break-word;
        background-color: #2e2e2e;
        padding: 10px;
        border-radius: 4px;
        color: white;
        overflow: scroll;
    }
</style>
