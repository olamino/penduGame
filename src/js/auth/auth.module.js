import LoginComponent from './login/login.component';

const moduleName = 'Auth';

angular.module(moduleName,[])
    .component('login',LoginComponent);

export default moduleName;