import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
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

    buildList({item, index}) {
        const header = () => (
            <View style={{marginHorizontal: 25, marginVertical: 14}}>
                <Text style={{fontFamily: 'Roboto-Bold'}} category='h6'>
                    {item.title}
                </Text>
                <Text style={{fontSize: 14}} status='warning'>
                    {item.company}
                </Text>
            </View>
        );
        return (
            <View>
                <Card header={header} style={{marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, elevation: 25}}>
                    {item.description && <Text style={{fontSize: 14, marginBottom: 10}}>{item.description}</Text>}
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, opacity: 0.5}}>
                        <Text style={{fontSize: 12}}>{item.location}</Text>
                        <Text style={{fontSize: 12}}>
                            {(new Date(item.start_date)).getFullYear()} - {item.until_date ? (new Date(item.until_date)).getFullYear() : 'Now'}
                        </Text>
                    </View>
                </Card>
                {index === this.state.experiences.length - 1 && <Button onPress={() => this.props.navigation.navigate('Portfolio')} style={{marginVertical: 15}}>SHOW MORE</Button>}
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} titleStyle={{fontFamily: 'Roboto-Medium'}} alignment='center' style={{elevation: 30}} leftControl={this.backAction()}/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.experiences ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.experiences}
                                      renderItem={this.buildList.bind(this)}
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
