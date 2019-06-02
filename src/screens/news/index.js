import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

import { getNews } from '../../store/actions/news_actions';

class NewsScreen extends Component {
	componentDidMount() {
		this.props.onGetNews();
	}

	renderArticles = news => {
		if (news.articles) {
			return news.articles.map((article, i) => {
				return (
					<TouchableOpacity
						key={i}
						onPress={() => this.props.navigation.navigate('Article', { ...article })}
					>
						<View style={styles.cardContainer}>
							<Image
								source={{
									uri : `${article.image}`
								}}
								style={{
									height         : 150,
									justifyContent : 'space-around'
								}}
								resizeMode='cover'
							/>
						</View>
						<View style={styles.contentCard}>
							<Text style={styles.titleCard}>{article.title}</Text>
							<View style={styles.bottomCard}>
								<Text style={styles.bottomCardTeam}>{article.team}</Text>
								<Text style={styles.bottomCardText}>
									Posted at - {Moment(article.date).format('d MMM')}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				);
			});
		} else {
			return <ActivityIndicator />;
		}
	};

	render() {
		return (
			<ScrollView
				style={{
					backgroundColor : '#F0F0F0'
				}}
			>
				{this.renderArticles(this.props.News)}
			</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	return {
		News : state.News
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetNews : () => dispatch(getNews())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);

const styles = StyleSheet.create({
	cardContainer  : {
		backgroundColor : '#fff',
		margin          : 10,
		marginBottom    : 0,
		shadowColor     : '#dddddd',
		shadowOffset    : { width: 0, height: 2 },
		shadowOpacity   : 0.8,
		shadowRadius    : 2,
		elevation       : 1,
		borderRadius    : 2
	},
	contentCard    : {
		borderWidth : 1,
		borderColor : '#dddddd',
		width       : '95%',
		alignSelf   : 'center'
	},
	titleCard      : {
		color    : '#232323',
		fontSize : 16,
		padding  : 10
	},
	bottomCard     : {
		flex           : 1,
		flexDirection  : 'row',
		borderTopWidth : 1,
		borderTopColor : '#e6e6e6',
		padding        : 10
	},
	bottomCardTeam : {
		color    : '#828282',
		fontSize : 12
	},
	bottomCardText : {
		color    : '#828282',
		fontSize : 12
	}
});
