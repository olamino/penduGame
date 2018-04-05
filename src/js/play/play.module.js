import PlayFactory from './play.service';
import PlayFilter from './play.filter';
import PlayDetailComponent from './playDetail/playDetail.component';

const moduleName = 'Play';

angular.module(moduleName,[])
    .factory('$playData',PlayFactory)
    .filter('playfilter', () => PlayFilter.HideWordFactory)
    .component('playDetail',PlayDetailComponent);

export default moduleName;