import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
    Card,
    CardHeader,
    Divider,
    Icon,
    Layout,
    Spinner,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {FlatList, RefreshControl, StatusBar, View, Image} from "react-native";

export default class PortfolioScreen extends Component {
    state = {
        isLoading: true,
        portfolios: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince/portfolios')
            .then(result => result.json())
            .then(portfolios => {
                this.setState({isLoading: false, portfolios});
            })
            .catch(err => {
                this.setState({isLoading: false});
                alert(err.message);
            });
    }

    backAction = () => (
        <TopNavigationAction icon={(style) => <Icon {...style} name='arrow-back'/>}
                             onPress={() => this.props.navigation.goBack()}/>
    );

    buildList({item}) {
        const header = () => (
            <React.Fragment>
                {item.medias.length ?
                    <Image
                        style={{flex: 1, height: 240}} resizeMode='cover'
                        source={{uri: item.medias[0].src}}
                    />
                    : null
                }
                <Text style={{marginHorizontal: 20, marginVertical: 16}} category='h6'
                      status='warning'>{item.title}</Text>
            </React.Fragment>
        );
        return (
            <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch'}}>
                {item.description && <Text>{item.description}</Text>}
                {item.organization && <Text>{item.organization}</Text>}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', opacity: 0.5}}>
                    <Text style={{fontSize: 12}}>{item.category} - {item.platform}</Text>
                    <Text style={{fontSize: 12}}>
                        {(new Date(item.start_date)).getFullYear()} - {item.end_date ? (new Date(item.end_date)).getFullYear() : 'Now'}
                    </Text>
                </View>
            </Card>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} alignment='center'
                               leftControl={this.backAction()}/>
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.portfolios ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.portfolios}
                                      renderItem={this.buildList}
                                      keyExtractor={item => item.id.toString()}
                                      refreshControl={
                                          <RefreshControl refreshing={this.state.isLoading}
                                                          onRefresh={() => this.fetchData()}/>
                                      }
                            />
                            : <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}><Spinner/></View>
                    }
                </Layout>
            </SafeAreaView>
        );
    }
}
