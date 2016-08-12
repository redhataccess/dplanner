// Test without this, may need it back in eventually for older browsers?
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'

// import IndexRoute from 'react-router/lib/IndexRoute'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import Redirect from 'react-router/lib/Redirect'
import browserHistory from 'react-router/lib/browserHistory'
import uuid from 'node-uuid'

// Redux
import thunkMiddleware from 'redux-thunk'
import createStore from 'redux/lib/createStore'
import combineReducers from 'redux/lib/combineReducers'
import applyMiddleware from 'redux/lib/applyMiddleware'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Provider from 'react-redux/lib/components/Provider'

import * as rootReducer from './flux/reducers/rootReducer'

import Home                             from './components/Home.jsx'

import NewPlanContainer                         from './containers/NewPlanContainer.jsx'
import EditPlanContainer                        from './containers/EditPlanContainer.jsx'
import ProgramNominationContainer               from './containers/steps/ProgramNominationContainer.jsx'
import GeneralInformationContainer              from './containers/steps/GeneralInformationContainer.jsx'
import CloudUseCasesContainer                   from './containers/steps/CloudUseCasesContainer.jsx'
import CloudArchitectureContainer               from './containers/steps/CloudArchitectureContainer.jsx'
import NetworkingArchitectureContainer          from './containers/steps/NetworkingArchitectureContainer.jsx'
import StorageArchitectureContainer             from './containers/steps/StorageArchitectureContainer.jsx'
import WorkloadScalingContainer                 from './containers/steps/WorkloadScalingContainer.jsx'
import AdditionalSupportingDocumentsContainer   from './containers/steps/AdditionalSupportingDocumentsContainer.jsx'
import PreviewContainer                         from './containers/steps/PreviewContainer.jsx'

// import NotFoundPage from './components/NotFoundPage.jsx'
import Utils from './utils';

// window.React = React; // For React Developer Tools

const reducers = combineReducers({
    ...rootReducer,
    routing: routerReducer
});


let middleware = [thunkMiddleware];

if (process.env.NODE_ENV != 'production') {
    let createLogger = require('redux-logger');
    const loggerMiddleware = createLogger();
    middleware = [...middleware, loggerMiddleware]
}

const store = createStore(
    reducers,
    applyMiddleware(
        ...middleware
    )
);

const history = syncHistoryWithStore(browserHistory, store);

// The parent / is more for development, in production we have a node.js redirect for /.  Note that the labs apps css
// is only loaded when /labs is in the location, so in dev always hit /labs/dplanner and not /.  Again the / is there
// just in-case.
const routes = [
    {
        path: '/',
        indexRoute: { onEnter: (nextState, replace) => replace(`/labs/dplanner`) },
        childRoutes: [
            {
                path: '/labs/dplanner',
                component: Home,
                indexRoute: { onEnter: (nextState, replace) => replace(`/labs/dplanner/new`) },
                childRoutes: [
                    {
                        path: `new`,
                        component: NewPlanContainer,
                    },
                    {
                        path: `:uuid/edit`,
                        component: EditPlanContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.PROGRAM_NOMINATION.link}`,
                        component: ProgramNominationContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.GENERAL_INFORMATION.link}`,
                        component: GeneralInformationContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.CLOUD_USE_CASE.link}`,
                        component: CloudUseCasesContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.CLOUD_ARCHITECTURE.link}`,
                        component: CloudArchitectureContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.NETWORKING_ARCHITECTURE.link}`,
                        component: NetworkingArchitectureContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.STORAGE_ARCHITECTURE.link}`,
                        component: StorageArchitectureContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.WORKLOAD_SCALING.link}`,
                        component: WorkloadScalingContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS.link}`,
                        component: AdditionalSupportingDocumentsContainer,
                    },
                    {
                        path: `:uuid/${Utils.navigationLookup.PREVIEW.link}`,
                        component: PreviewContainer,
                    },
                ]
            }
        ]
    }
];

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('content')
);

// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             {/*<Route name="home" path="/labs/dplanner(/:uuid)" component={Home} />*/}
//
//             <Route name="home" path="/labs/dplanner" component={Home}>
//                 <IndexRedirect to="home" />
//                 <Route name="saved" path=":uuid" component={Home}>
//                     <Route path="programNomination" component={ProgramNominationContainer} />
//                     <Route path="generalInformation" component={GeneralInformationContainer} />
//                 </Route>
//             </Route>
//
//             <Redirect from="/?" to="home" />
//             <Redirect from="" to="home" />
//         </Router>
//     </Provider>,
//     document.getElementById('content')
// );
