import ReactComponent from 'react/lib/ReactComponent'

export default class NotFoundPage extends ReactComponent {
    static getProps() {
        return {};
    }
    render() {
        return <div>
            <h3>Not found</h3>
            <p>The page you requested was not found.</p>
        </div>;
    }
}
