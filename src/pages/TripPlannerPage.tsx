import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  TripDetail: { tripId: string };
  AIAssistant: undefined;
};

type TripPlannerPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

// Mock data for activities
const mockActivities = [
  {
    id: '1',
    name: '熊猫基地',
    description: '观赏国宝大熊猫，了解它们的生活习性',
    duration: 3,
    cost: 58,
    category: '景点',
    startTime: '09:00',
  },
  {
    id: '2',
    name: '宽窄巷子',
    description: '体验成都传统街巷文化，品尝当地小吃',
    duration: 2,
    cost: 0,
    category: '文化',
    startTime: '12:30',
  },
  {
    id: '3',
    name: '锦里古街',
    description: '夜游锦里，感受成都夜生活',
    duration: 2,
    cost: 0,
    category: '夜生活',
    startTime: '19:00',
  },
];

const TripPlannerPage: React.FC = () => {
  const navigation = useNavigation<TripPlannerPageNavigationProp>();
  const [destination, setDestination] = useState('成都');
  const [startDate, setStartDate] = useState('2024-05-01');
  const [endDate, setEndDate] = useState('2024-05-03');
  const [budget, setBudget] = useState('1500');
  const [travelType, setTravelType] = useState('休闲');
  const [interests, setInterests] = useState('美食,文化,自然');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState([
    {
      day: 1,
      date: '2024-05-01',
      activities: mockActivities,
      budget: 500,
    },
    {
      day: 2,
      date: '2024-05-02',
      activities: [
        {
          id: '4',
          name: '青城山',
          description: '道教名山，风景秀丽',
          duration: 6,
          cost: 80,
          category: '自然',
          startTime: '08:00',
        },
        {
          id: '5',
          name: '都江堰',
          description: '世界文化遗产，古代水利工程',
          duration: 3,
          cost: 90,
          category: '文化',
          startTime: '14:00',
        },
      ],
      budget: 500,
    },
    {
      day: 3,
      date: '2024-05-03',
      activities: [
        {
          id: '6',
          name: '武侯祠',
          description: '纪念诸葛亮的祠堂',
          duration: 2,
          cost: 60,
          category: '文化',
          startTime: '09:00',
        },
        {
          id: '7',
          name: '春熙路',
          description: '成都商业中心，购物天堂',
          duration: 3,
          cost: 0,
          category: '购物',
          startTime: '12:00',
        },
      ],
      budget: 500,
    },
  ]);

  const handleGenerateItinerary = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('成功', '行程生成完成！');
    }, 1500);
  };

  const handleSaveTrip = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('TripDetail', { tripId: '1' });
    }, 1000);
  };

  const renderActivity = ({ item }: { item: typeof mockActivities[0] }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.activityTime}>
          <Text style={styles.activityTimeText}>{item.startTime}</Text>
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityName}>{item.name}</Text>
          <Text style={styles.activityDescription}>{item.description}</Text>
          <View style={styles.activityMeta}>
            <Text style={styles.activityDuration}>{item.duration}小时</Text>
            <Text style={styles.activityCost}>¥{item.cost}</Text>
            <View style={[styles.activityCategory, { backgroundColor: getCategoryColor(item.category) }]}>
              <Text style={styles.activityCategoryText}>{item.category}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderDay = ({ item }: { item: typeof itinerary[0] }) => (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayNumber}>第{item.day}天</Text>
        <Text style={styles.dayDate}>{item.date}</Text>
        <Text style={styles.dayBudget}>预算: ¥{item.budget}</Text>
      </View>
      <View style={styles.dayActivities}>
        {item.activities.map((activity) => (
          <View key={activity.id}>{renderActivity({ item: activity })}</View>
        ))}
      </View>
    </View>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '景点':
        return '#E0F2FE';
      case '文化':
        return '#ECFCCB';
      case '自然':
        return '#DBEAFE';
      case '美食':
        return '#FEF3C7';
      case '购物':
        return '#FCE7F3';
      case '夜生活':
        return '#EDE9FE';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trip Details Form */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>行程详情</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="目的地"
            value={destination}
            onChangeText={setDestination}
          />
          <View style={styles.dateInputs}>
            <TextInput
              style={[styles.input, styles.dateInput]}
              placeholder="开始日期"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={[styles.input, styles.dateInput]}
              placeholder="结束日期"
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="总预算 (¥)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="旅行类型 (如：休闲、冒险、文化等)"
            value={travelType}
            onChangeText={setTravelType}
          />
          <TextInput
            style={styles.input}
            placeholder="兴趣标签 (用逗号分隔)"
            value={interests}
            onChangeText={setInterests}
          />
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateItinerary}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.generateButtonText}>生成行程</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Itinerary Timeline */}
      <View style={styles.itinerarySection}>
        <Text style={styles.sectionTitle}>行程安排</Text>
        <FlatList
          data={itinerary}
          renderItem={renderDay}
          keyExtractor={(item) => `day-${item.day}`}
          scrollEnabled={false}
        />
      </View>

      {/* Budget Summary */}
      <View style={styles.budgetSection}>
        <Text style={styles.sectionTitle}>预算 summary</Text>
        <View style={styles.budgetCard}>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>总预算</Text>
            <Text style={styles.budgetValue}>¥{budget}</Text>
          </View>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>已分配</Text>
            <Text style={styles.budgetValue}>¥{parseInt(budget)}</Text>
          </View>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>剩余</Text>
            <Text style={[styles.budgetValue, styles.budgetRemaining]}>¥0</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.aiButton]}
          onPress={() => navigation.navigate('AIAssistant')}
        >
          <Ionicons name="chatbubbles" size={20} color="#3B82F6" />
          <Text style={styles.aiButtonText}>AI助手</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.saveButton]}
          onPress={handleSaveTrip}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>保存行程</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  formContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  dateInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itinerarySection: {
    padding: 20,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dayDate: {
    fontSize: 14,
    color: '#666',
  },
  dayBudget: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  dayActivities: {
    paddingLeft: 12,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  activityTime: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  activityTimeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDuration: {
    fontSize: 12,
    color: '#666',
  },
  activityCost: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  activityCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityCategoryText: {
    fontSize: 12,
    color: '#333',
  },
  budgetSection: {
    padding: 20,
  },
  budgetCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#666',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  budgetRemaining: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  aiButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  aiButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TripPlannerPage;