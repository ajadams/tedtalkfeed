
var Feed_Component = React.createClass({
	getInitialState: function(){
		return {
			feed_items: []
		};
	},

	componentWillMount: function(){
		
	},

	componentDidMount: function(){
		google.load("feeds", "1");
		var entry, arr_copy = this.state.feed_items.slice(), _this = this;

	    function initialize() {
	    	//google feed api
	      	var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
	      	feed.setNumEntries(20);
	      	feed.load(function(result) {
		        if (!result.error) {
					for (var i = 0; i < result.feed.entries.length; i++) {
						entry = result.feed.entries[i];
						//add each entry to copy of current state of feed_items array
						arr_copy.push(entry);
						console.log(arr_copy);
					}
					//render state once feed is done being added to array
					_this.setState({feed_items: arr_copy});
		        }
	      	});
	    }

	    google.setOnLoadCallback(initialize);
	},

	fullView: function(elem){
		elem.css('border', '3px solid red');
		var data = elem.data('id');
		console.log(data)
	},

	render: function(){
		var timeago = null, _this = this;
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6">
						<div className={'feed-items-container'}>
							<ul>
								{
									this.state.feed_items.length > 0 ?
									this.state.feed_items.map(function(val, index, arr){
										timeago = moment(val.publishedDate).fromNow();
										return <FeedItem title={val.title}
														 img={val.mediaGroups[0].contents[0].thumbnails[0].url}
														 published={timeago}
														 id={index}
														 fullView={_this.fullView}
														 key={index}
														 css={'feed-item clearfix'} /> ;
									}) :
									<li></li>
								}
							</ul>
						</div>
					</div>
					<div className="col-sm-6 full-view">
						<h3 className="text-center"><b>TED</b><span>Talk</span> <small>Feed</small></h3>
						<div className="view">
							view here
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var FeedItem = React.createClass({
	makeActive: function(e){
		e.preventDefault();
		var elem = $(e.currentTarget).closest('.feed-item');
		console.log(elem);
		this.props.fullView(elem);
	},

	render: function(){
		return(
			<li className={this.props.css} data-id={this.props.id}>
				<img className="thumb" src={this.props.img} />
				<div className="content">
					<a href="" onClick={this.makeActive}>
						<div className="title">{this.props.title}</div>
						<div className="timeago"><small>Posted: {this.props.published}</small></div>
					</a>
				</div>
			</li>
		);
	}
});

ReactDOM.render( <Feed_Component />, document.getElementById('feed-container') );