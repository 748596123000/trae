import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for saved trips
const mockSavedTrips = [
  {
    id: '1',
    name: '成都3日游',
    destination: '成都',
    date: '2024-05-01 至 2024-05-03',
    budget: 1500,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20city%20skyline&image_size=landscape_16_9',
  },
  {
    id: '2',
    name: '大理洱海骑行',
    destination: '大理',
    date: '2024-05-10 至 2024-05-13',
    budget: 2000,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Erhai%20Lake%20Dali&image_size=landscape_16_9',
  },
];

// Mock data for spending history
const mockSpendingHistory = [
  {
    id: '1',
    category: '住宿',
    amount: 300,
    date: '2024-04-20',
    trip: '成都3日游',
  },
  {
    id: '2',
    category: '餐饮',
    amount: 200,
    date: '2024-04-20',
    trip: '成都3日游',
  },
  {
    id: '3',
    category: '交通',
    amount: 100,
    date: '2024-04-21',
    trip: '成都3日游',
  },
];

const ProfilePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('中文');

  const renderSavedTrip = ({ item }: { item: typeof mockSavedTrips[0] }) => (
    <TouchableOpacity style={styles.tripCard}>
      <Image source={{ uri: item.image }} style={styles.tripImage} />
      <View style={styles.tripContent}>
        <Text style={styles.tripName}>{item.name}</Text>
        <Text style={styles.tripDestination}>{item.destination}</Text>
        <Text style={styles.tripDate}>{item.date}</Text>
        <Text style={styles.tripBudget}>预算: ¥{item.budget}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSpending = ({ item }: { item: typeof mockSpendingHistory[0] }) => (
    <View style={styles.spendingItem}>
      <View style={styles.spendingInfo}>
        <Text style={styles.spendingCategory}>{item.category}</Text>
        <Text style={styles.spendingTrip}>{item.trip}</Text>
        <Text style={styles.spendingDate}>{item.date}</Text>
      </View>
      <Text style={styles.spendingAmount}>¥{item.amount}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Profile */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait&image_size=square' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>旅行者</Text>
          <Text style={styles.userBio}>热爱旅行，追求性价比</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>编辑资料</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>旅行次数</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>¥12,500</Text>
          <Text style={styles.statLabel}>总花费</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>平均评分</Text>
        </View>
      </View>

      {/* Saved Trips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>保存的行程</Text>
        {mockSavedTrips.map((trip) => (
          <View key={trip.id}>{renderSavedTrip({ item: trip })}</View>
        ))}
      </View>

      {/* Spending History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>花费历史</Text>
        <View style={styles.spendingContainer}>
          {mockSpendingHistory.map((spending) => (
            <View key={spending.id}>{renderSpending({ item: spending })}</View>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>设置</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>深色模式</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#3B82F6' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>推送通知</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e0e0e0', true: '#3B82F6' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>语言</Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>{language}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>隐私设置</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>关于我们</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  editProfileButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  tripImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  tripContent: {
    flex: 1,
    padding: 12,
  },
  tripName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  tripBudget: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  spendingContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  spendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  spendingInfo: {
    flex: 1,
  },
  spendingCategory: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  spendingTrip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  spendingDate: {
    fontSize: 12,
    color: '#999',
  },
  spendingAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingsContainer: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: 'white',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
});

export default ProfilePage;