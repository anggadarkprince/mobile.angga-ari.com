import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
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
import {FlatList, RefreshControl, StatusBar, View} from "react-native";

export default class ExperienceScreen extends Component {
    state = {
        isLoading: true,
        experiences: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince/experiences')
            .then(result => result.json())
            .then(experiences => {
                this.setState({isLoading: false, experiences});
            })
            .catch(err => {
                this.setState({isLoading: false});
                alert(err.message);
            });
    }

    backAction = () => (
        <TopNavigationAction icon={(style) => <Icon {...style} name='arrow-back' />} onPress={() => this.props.navigation.goBack()}/>
    );

    buildList({item}) {
        const header = () => (
            <CardHeader
                title={item.title}
                titleStyle={{fontFamily: 'Roboto-Bold'}}
                style={{description: {opacity: 0.5}}}
            />
        );
        return (
            <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch'}}>
                {item.company && <Text style={{fontFamily: 'Roboto-Medium'}} status='warning'>{item.company}</Text>}
                {item.description && <Text style={{fontSize: 14, opacity: 0.5}}>{item.description}</Text>}
                <Divider style={{marginVertical: 12}}/>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 12}}>{item.location}</Text>
                    <Text style={{fontSize: 12}}>
                        {(new Date(item.start_date)).getFullYear()} - {item.until_date ? (new Date(item.until_date)).getFullYear() : 'Now'}
                    </Text>
                </View>
            </Card>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} alignment='center' leftControl={this.backAction()}/>
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.experiences ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.experiences}
                                      renderItem={this.buildList}
                                      keyExtractor={item => item.id.toString()}
                                      refreshControl={
                                          <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.fetchData()} />
                                      }
                            />
                            : <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}><Spinner/></View>
                    }
                </Layout>
            </SafeAreaView>
        );
    }
}
