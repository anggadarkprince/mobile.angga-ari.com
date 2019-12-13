import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
    Card,
    CardHeader,
    Divider,
    Icon,
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    Spinner
} from '@ui-kitten/components';
import {StatusBar, FlatList, View, RefreshControl, StyleSheet} from "react-native";

export default class EducationScreen extends Component {
    state = {
        isLoading: true,
        educations: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince/educations')
            .then(result => result.json())
            .then(educations => {
                this.setState({isLoading: false, educations});
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
            <CardHeader
                title={item.education}
                description={item.institution}
            />
        );
        return (
            <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch'}}>
                {item.field && <Text style={{fontFamily: 'Roboto-Bold'}}>{item.field}</Text>}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', opacity: 0.5}}>
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
                <TopNavigation title={this.props.navigation.getParam('title')} alignment='center'
                               leftControl={this.backAction()}/>
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.educations ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.educations}
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
};
