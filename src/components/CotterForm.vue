<template>
    <div id="cotter-block">
        <div id="cotter-form-container"></div>
        <div v-show="success" id="cotter-verify-block">
            <button @click="verifyCotter()" id="verify-button">Verify</button>
        </div>
    </div>
</template>


<script>
import Cotter from 'cotter';
import {CotterIdentity} from 'cotter-token-js';

export default {
    name: 'cotter-form',
    data() {
        return {
            success: false,
            payload: null,
            payloadString: null,
            validToken: false,
            accessToken: null,
        }
    },
    mounted () {
        var cotter = new Cotter("28c090a0-6067-457d-976a-b0ac664f05fc");
        cotter.signInWithLink().showEmailForm()
        .then(payload => {
            this.success = true;
            this.payload = payload;
            this.accessToken = this.payload.oauth_token.access_token
            console.log("payload received: ", this.payload.oauth_token.access_token);
            this.payloadString = JSON.stringify(payload, null, 4);
            alert(this.payloadString);
        }).catch(err => {
            console.log(err);
            alert(err);
        })
    },
    methods: {
        verifyCotter() {
            var cotterID = new CotterIdentity(this.payload.token);
           
            this.validToken = cotterID.validate();
            var message = (this.validToken) ? "Validation Successful": "Validation Failed";
            alert(message);
            console.log("done verify");
        }
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

    #verify-token-button {
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
