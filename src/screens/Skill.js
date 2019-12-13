import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import {
    Button,
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
        setTimeout(() => this.fetchData(), 500);
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

    buildList({item, index}) {
        return (
            <View>
                <View style={{marginBottom: 15, marginTop: 10}}>
                    <Text key={item.id} style={{fontSize: 18, textAlign: 'center', marginBottom: 20, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2}}>
                        {item.group}
                    </Text>
                    {
                        item.expertise && item.expertise.map(skill => {
                            let stars = [];
                            for(let i = 1; i <= 5; i++){
                                stars.push(<Icon key={'level-' + skill.id + i} name='star' width={16} height={16} fill={i <= skill.level ? '#fa0' : '#ddd'} />);
                            }
                            return (
                                <Card key={skill.id} style={{marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, elevation: 25}}>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={{fontFamily: 'Roboto-Bold'}}>{skill.expertise}</Text>
                                            <Text style={{fontSize: 12, lineHeight: 16, color: '#8f9bb3'}}>{skill.description}</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>{stars.map(star => star)}</View>
                                    </View>
                                </Card>
                            )
                        })
                    }
                </View>
                {index === this.state.skills.length - 1 && <Button onPress={() => this.props.navigation.navigate('Experience')} style={{marginVertical: 15}}>SHOW MORE</Button>}
            </View>
        )
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
                <TopNavigation title={this.props.navigation.getParam('title')} titleStyle={{fontFamily: 'Roboto-Medium'}} alignment='center' style={{elevation: 30}}
                               leftControl={this.backAction()}/>
                <Layout style={{flex: 1, justifyContent: 'center'}}>
                    {
                        this.state.skills ?
                            <FlatList contentContainerStyle={{padding: 20}}
                                      data={this.state.skills}
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
