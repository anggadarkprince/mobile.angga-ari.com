import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
    Button,
    Card,
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

    buildList({item, index}) {
        const header = () => (
            <React.Fragment>
                {item.medias.length ?
                    <Image
                        style={{flex: 1, height: 240}} resizeMode='cover'
                        source={{uri: item.medias[0].src}}
                    />
                    : null
                }
                <Text style={{marginHorizontal: 25, marginVertical: 14, fontFamily: 'Roboto-Bold'}} category='h6'
                      status='warning'>{item.title}</Text>
            </React.Fragment>
        );
        return (
            <View>
                <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent', elevation: 25}}>
                    <View style={{marginBottom: 10}}>
                        {item.description && <Text style={{fontFamily: 'Roboto-Medium'}}>{item.description}</Text>}
                        {item.organization && <Text style={{fontSize: 14, color: '#8f9bb3'}}>{item.organization}</Text>}
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, opacity: 0.5}}>
                        <Text style={{fontSize: 12}}>{item.category} - {item.platform}</Text>
                        <Text style={{fontSize: 12}}>
                            {(new Date(item.start_date)).getFullYear()} - {item.end_date ? (new Date(item.end_date)).getFullYear() : 'Now'}
                        </Text>
                    </View>
                </Card>
                {index === this.state.portfolios.length - 1 && <Button appearance='ghost' status='primary' icon={(style) => <Icon name='arrow-back-outline' {...style} />} onPress={() => this.props.navigation.navigate('Home')} style={{marginVertical: 15}}>BACK TO HOME</Button>}
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title={this.props.navigation.getParam('title')} titleStyle={{fontFamily: 'Roboto-Medium'}} alignment='center' style={{elevation: 30, marginTop: StatusBar.currentHeight}}
                               leftControl={this.backAction()}/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.portfolios ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.portfolios}
                                      renderItem={this.buildList.bind(this)}
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
