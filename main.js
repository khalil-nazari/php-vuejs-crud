var app = new Vue({
    el : '#app', 

    data: {
        errorMsg: "", 
        successMsg: "", 
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,

        users : [], 
        newUser: {
            name: "", 
            email: "", 
            phone: ""
        }, 
        currentUser: {}
    }, 

    mounted: function () {
        this.getAllUsers();
        this.addUser();
    }, 

    methods: {
        // Get all data from databse
        getAllUsers () {
            axios.get("http://localhost/crud-vue-php/process.php?action=read")
            .then((response) => {
                if(response.data.error) {
                    app.errorMsg = response.data.message; 
                } else {
                    app.users = response.data.users; 
                }
            })
        }, 

        // Add New user
        addUser() { 
            var formData = app.toFormData(app.newUser); 
            
            axios.post("http://localhost/crud-vue-php/process.php?action=create", formData)
            .then(function (response) {
                app.newUser = {
                    name: '', 
                    email: '', 
                    phone: '',
                }
                if(response.data.error) {
                    app.errorMsg = response.data.message; 
                } else {
                    app.successMsg = response.data.message; 
                    app.getAllUsers();
                }
            })
        }, 

        // Get current user data
        selectUser(user) {
            app.currentUser = user;
        }, 

        //update a user
        updateUser() { 
            var formData = app.toFormData(app.currentUser); 
            
            axios.post("http://localhost/crud-vue-php/process.php?action=update", formData)
            .then(function (response) {
                app.currentUser = {}

                if(response.data.error) {
                    app.errorMsg = response.data.message; 
                } else {
                    app.successMsg = response.data.message; 
                    app.getAllUsers();
                }
            })
        }, 

        //Delete a user
        deleteUser() {
            var formData = app.toFormData(app.currentUser); 
            
            axios.post("http://localhost/crud-vue-php/process.php?action=delete", formData)
            .then(function (response) {
                app.currentUser = {};
                if(response.data.error) { 
                    app.errorMsg = response.data.message; 
                } else { 
                    app.successMsg = response.data.message; 
                    app.getAllUsers();
                }
            })
        }, 

        toFormData(obj) {
            var fd = new FormData();
            for(var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        }, 
        

    }
});