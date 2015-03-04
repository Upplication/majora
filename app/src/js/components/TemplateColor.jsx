(function (window, React) {
    "use strict";
    
    window.TemplateColor = React.createClass({
        getInitialState: function () {
            return {colorHex: '#'};
        },
        changed: function (e) {
            this.setState({colorHex: e.target.value}, function () {
                this.refs.colorHex.getDOMNode().style.backgroundColor = this.state.colorHex;
            });
            
            this.props.scope.setColor(this.props.index, this.state.colorHex);
        },
        render: function () {
            return (
                <div classList='color-selector'>
                    <div classList='color-badge' ref='colorBadge'></div>
                    <input type='text' value={this.state.colorHex} onChange={this.changed} />
                </div>
            );
        }
    });

    window.TemplateColorList = React.createClass({
        render: function () {
            var colors = this.props.colors.map(function (color, i) {
                return (
                    <TemplateColor key={color} index={i} scope={this.props.scope} />
                );
            }.bind(this));

            return (
                <ul classList='color-list'>{colors}</ul>
            );
        }
    });
    
}(window, React));