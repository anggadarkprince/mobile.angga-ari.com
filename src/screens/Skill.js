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
import {FlatList, StatusBar, View, RefreshControl} from "react-native";

export default class SkillScreen extends Component {
    state = {
        isLoading: true,
        skills: null
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://192.168.1.123:8080/api/anggadarkprince/skills')
            .then(result => result.json())
            .then(skills => {
                this.setState({isLoading: false, skills: skills.skills});
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
        return (
            <View style={{marginBottom: 20}}>
                <Text key={item.id} style={{fontSize: 18, textAlign: 'center', fontFamily: 'Roboto-Bold', marginBottom: 15}}>{item.group}</Text>
                {
                    item.expertise && item.expertise.map(skill => {
                        let stars = [];
                        for(let i = 1; i <= 5; i++){
                            stars.push(<Icon key={'level-' + skill.id + i} name='star' width={16} height={16} fill={i <= skill.level ? '#fa0' : '#ddd'} />);
                        }
                        return (
                            <Card key={skill.id} style={{marginBottom: 15, alignSelf: 'stretch'}}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontFamily: 'Roboto-Medium'}}>{skill.expertise}</Text>
                                        <Text style={{fontSize: 12, lineHeight: 16, opacity: 0.5}}>{skill.description}</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>{stars.map(star => star)}</View>
                                </View>
                            </Card>
                        )
                    })
                }
            </View>
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
                        this.state.skills ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.skills}
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
