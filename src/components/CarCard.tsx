import { carStatusList } from '@/constants/CarStatus';
import Colors from '@/constants/Colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import glyphmaps from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconsName = keyof typeof glyphmaps;

/** Status IDs where the timer must NOT run */
const TIMER_PAUSED_IDS = [5, 6, 7]; // Delivered, Paused, Cancelled

interface CarCardProps {
  carModel: string;
  licensePlate: string;
  packageName?: string;
  initialStatusId?: number;
  onRemove?: () => void;
}

const CarCard = ({
  carModel,
  licensePlate,
  packageName = 'Ceramic Pro Coating',
  initialStatusId = 1,
  onRemove,
}: CarCardProps) => {
  const [currentStatusId, setCurrentStatusId] = useState<number>(initialStatusId);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStatus = carStatusList.find((s) => s.id === currentStatusId) ?? carStatusList[0];
  const isTimerActive = !TIMER_PAUSED_IDS.includes(currentStatusId);

  /* ── Timer logic ─────────────────────────────────────── */
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isTimerActive) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerActive]);

  /* ── Status navigation ───────────────────────────────── */
  const goToPrev = () => {
    if (currentStatusId > 1) setCurrentStatusId((id) => id - 1);
  };

  const goToNext = () => {
    if (currentStatusId < carStatusList.length) setCurrentStatusId((id) => id + 1);
  };

  /* ── Helpers ─────────────────────────────────────────── */
  const formatTime = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isFirst = currentStatusId === 1;
  const isLast = currentStatusId === carStatusList.length;

  const isWaiting = currentStatusId === 1;
  const isCancelled = currentStatusId === 7;
  const isDelivered = currentStatusId === 5;

  const getCardBg = () => {
    if (isWaiting) return '#ffffff';
    if (isCancelled) return Colors.error; // #ba1a1a
    return Colors.primary;
  };

  const getIconColor = () => {
    if (isWaiting) return Colors.primary;
    if (isCancelled) return '#ffdad6'; // a light red for contrast against Colors.error
    return Colors.primaryLight;
  };

  const dynamicStyles = {
    cardBg: getCardBg(),
    textColorPrimary: isWaiting ? '#1A1A1A' : '#ffffff',
    textColorSecondary: isWaiting ? '#666666' : 'rgba(255,255,255,0.75)',
    chipBg: isWaiting ? Colors.chip : 'rgba(255,255,255,0.18)',
    chipText: isWaiting ? Colors.primary : '#ffffff',
    dividerColor: isWaiting ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
    iconColor: getIconColor(),
    navBtnPressedBg: isWaiting ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)',
    navBtnDisabledIcon: isWaiting ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.3)',
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: dynamicStyles.cardBg }]}>
        {/* ── Row 1: Status chip + Timer ─────────────────── */}
        <View style={styles.topRow}>
          <View style={[styles.statusChip, { backgroundColor: dynamicStyles.chipBg }]}>
            <View style={[styles.statusDot, !isTimerActive && styles.statusDotPaused, { backgroundColor: dynamicStyles.iconColor }]} />
            <Text style={[styles.statusLabel, { color: dynamicStyles.chipText }]}>{currentStatus.label.toUpperCase()}</Text>
          </View>

          <View style={styles.timerBlock}>
            <Text style={[styles.timerLabel, { color: dynamicStyles.textColorSecondary }]}>TIME ELAPSED</Text>
            <Text style={[styles.timerValue, { color: dynamicStyles.textColorPrimary }]}>{formatTime(elapsedSeconds)}</Text>
          </View>
        </View>

        {/* ── Row 2: Car info ────────────────────────────── */}
        <View style={styles.carInfoBlock}>
          <Text style={[styles.carModel, { color: dynamicStyles.textColorPrimary }]}>{carModel}</Text>
          <Text style={[styles.licensePlate, { color: dynamicStyles.textColorSecondary }]}>{licensePlate}</Text>
        </View>

        {/* ── Divider ────────────────────────────────────── */}
        <View style={[styles.divider, { borderBottomColor: dynamicStyles.dividerColor }]} />

        {/* ── Row 3: Package + Status controls ──────────── */}
        <View style={styles.bottomRow}>
          <View style={styles.packageRow}>
            <Ionicons name="sparkles-outline" size={18} color={dynamicStyles.iconColor} />
            <Text style={[styles.packageName, { color: dynamicStyles.textColorPrimary }]} numberOfLines={1}>
              {packageName}
            </Text>
          </View>

          <View style={styles.statusControls}>
            <Pressable
              onPress={goToPrev}
              disabled={isFirst}
              style={({ pressed }) => [styles.navBtn, pressed && { backgroundColor: dynamicStyles.navBtnPressedBg }]}
              accessibilityLabel="Previous status"
            >
              <Ionicons
                name="chevron-back-outline"
                size={32}
                color={isFirst ? dynamicStyles.navBtnDisabledIcon : dynamicStyles.iconColor}
              />
            </Pressable>

            <Ionicons
              name={currentStatus.icon as IoniconsName}
              size={24}
              color={dynamicStyles.iconColor}
            />

            <Pressable
              onPress={goToNext}
              disabled={isLast}
              style={({ pressed }) => [styles.navBtn, pressed && { backgroundColor: dynamicStyles.navBtnPressedBg }]}
              accessibilityLabel="Next status"
            >
              <Ionicons
                name="chevron-forward-outline"
                size={32}
                color={isLast ? dynamicStyles.navBtnDisabledIcon : dynamicStyles.iconColor}
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── Action Button (Outside) ─────────────────────── */}
      {(isDelivered || isCancelled) && (
        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [
            styles.outsideRemoveBtn,
            isDelivered && { borderColor: 'rgba(0, 129, 144, 0.3)', shadowColor: Colors.primary },
            pressed && { opacity: 0.7 }
          ]}
          accessibilityLabel={isDelivered ? "Finish service" : "Remove from queue"}
        >
          <Ionicons
            name={isDelivered ? "checkmark-circle-outline" : "trash-outline"}
            size={20}
            color={isDelivered ? Colors.primary : "#ff4d4d"}
          />
          <Text style={[
            styles.outsideRemoveBtnText,
            isDelivered && { color: Colors.primary }
          ]}>
            {isDelivered ? 'FINISH SERVICE' : 'REMOVE FROM QUEUE'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  /* Top row */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
  },
  statusDotPaused: {
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  statusLabel: {
    color: '#fff',
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.8,
  },

  /* Timer */
  timerBlock: {
    alignItems: 'flex-end',
  },
  timerLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Inter_18pt-Light',
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  timerValue: {
    color: '#fff',
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 28,
    letterSpacing: 1,
    marginTop: 2,
  },

  /* Car info */
  carInfoBlock: {
    marginBottom: 14,
  },
  carModel: {
    color: '#fff',
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 20,
  },
  licensePlate: {
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    marginTop: 3,
  },

  /* Divider */
  divider: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 14,
  },

  /* Bottom row */
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  packageName: {
    color: '#fff',
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '600',
    fontSize: 15,
  },

  /* Status controls */
  statusControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navBtn: {
    padding: 12,
    borderRadius: 12,
  },
  navBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  outsideRemoveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.3)',
    shadowColor: '#ff4d4d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  outsideRemoveBtnText: {
    color: '#ff4d4d',
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
