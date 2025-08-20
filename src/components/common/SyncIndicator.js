import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSyncData } from '../hooks/useSyncData';
import { colors } from '../styles/colors';

const SyncIndicator = () => {
  const { syncNow, isSyncing, lastSyncTime, syncError, clearSyncError } = useSyncData();

  if (syncError) {
    return (
      <View style={[styles.container, styles.error]}>
        <Ionicons name="cloud-offline" size={16} color={colors.error} />
        <Text style={styles.errorText}>Sync échouée</Text>
        <TouchableOpacity onPress={syncNow} style={styles.retryButton}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isSyncing) {
    return (
      <View style={[styles.container, styles.syncing]}>
        <Ionicons name="cloud-upload" size={16} color={colors.primary} />
        <Text style={styles.syncingText}>Synchronisation...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={syncNow}>
      <Ionicons name="cloud-done" size={16} color={colors.success} />
      <Text style={styles.successText}>
        {lastSyncTime ? `Sync: ${lastSyncTime.toLocaleTimeString()}` : 'Synchronisé'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  error: {
    backgroundColor: colors.error + '15',
  },
  syncing: {
    backgroundColor: colors.primary + '15',
  },
  errorText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.error,
  },
  syncingText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.primary,
  },
  successText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.success,
  },
  retryButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.error,
    borderRadius: 4,
  },
  retryText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default SyncIndicator;