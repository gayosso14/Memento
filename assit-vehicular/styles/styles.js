import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ── Base ──────────────────────────────────
  safe:   { flex: 1, backgroundColor: '#0D1117' },
  scroll: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },

  // ── Header ────────────────────────────────
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#1C2333',
  },
  headerIcon:  { fontSize: 32 },
  headerTitle: { color: '#E6EDF3', fontSize: 18, fontWeight: '700' },
  headerSub:   { color: '#8B949E', fontSize: 12 },

  // ── Tabs ──────────────────────────────────
  tabs:          { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1C2333' },
  tab:           { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive:     { borderBottomWidth: 2, borderBottomColor: '#58A6FF' },
  tabText:       { color: '#8B949E', fontSize: 11, fontWeight: '600' },
  tabTextActive: { color: '#58A6FF' },

  // ── Card ──────────────────────────────────
  card: {
    backgroundColor: '#161B22', borderRadius: 14, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#1C2333',
  },
  cardTitle: {
    color: '#8B949E', fontSize: 11, fontWeight: '700',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14,
  },

  // ── Row ───────────────────────────────────
  row:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  rowLabel: { color: '#C9D1D9', fontSize: 14 },

  // ── Badge ─────────────────────────────────
  badge:     { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, alignSelf: 'flex-start', marginTop: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },

  // ── Frenado ───────────────────────────────
  bigValue:            { color: '#58A6FF', fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  sliderBtns:          { flexDirection: 'row', justifyContent: 'space-around' },
  sliderBtn:           { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#30363D' },
  sliderBtnActive:     { backgroundColor: '#1F6FEB', borderColor: '#58A6FF' },
  sliderBtnText:       { color: '#8B949E', fontWeight: '600' },
  sliderBtnTextActive: { color: '#fff' },

  // ── Clima ─────────────────────────────────
  climaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  climaBtn:         { flex: 1, minWidth: '44%', alignItems: 'center', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#30363D', backgroundColor: '#0D1117' },
  climaBtnActive:   { borderColor: '#58A6FF', backgroundColor: '#1F6FEB22' },
  climaIcon:        { fontSize: 24, marginBottom: 4 },
  climaLabel:       { color: '#8B949E', fontSize: 12, fontWeight: '600' },
  climaLabelActive: { color: '#58A6FF' },
  climaAction:      { color: '#F0883E', fontSize: 10, marginTop: 2 },

  // ── Presets ───────────────────────────────
  presetRow:   { flexDirection: 'row', gap: 8 },
  presetBtn:   { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 1.5, backgroundColor: '#0D1117' },
  presetIcon:  { fontSize: 20, marginBottom: 4 },
  presetLabel: { fontSize: 10, fontWeight: '700', textAlign: 'center' },

  // ── Guardar ───────────────────────────────
  saveBtn:     { backgroundColor: '#1F6FEB', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 8 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // ── Historial ─────────────────────────────
  histItem:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0D1117', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#21262D' },
  histInfo:       { flex: 1 },
  histLabel:      { color: '#C9D1D9', fontWeight: '700', fontSize: 13 },
  histTime:       { color: '#8B949E', fontSize: 11, marginTop: 2 },
  histDetail:     { color: '#6E7681', fontSize: 11, marginTop: 4 },
  restoreBtn:     { padding: 8, borderRadius: 8, backgroundColor: '#21262D' },
  restoreBtnText: { fontSize: 18 },
  emptyText:      { color: '#6E7681', textAlign: 'center', paddingVertical: 20 },

  // ── Perfiles ──────────────────────────────
  perfilItem:         { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#0D1117', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#21262D' },
  perfilItemActivo:   { borderColor: '#58A6FF', backgroundColor: '#1F6FEB11' },
  perfilAvatar:       { fontSize: 32 },
  perfilInfo:         { flex: 1 },
  perfilNombre:       { color: '#C9D1D9', fontWeight: '700', fontSize: 14 },
  perfilNombreActivo: { color: '#58A6FF' },
  perfilSub:          { color: '#6E7681', fontSize: 11, marginTop: 2 },
  perfilBadge:        { color: '#58A6FF', fontSize: 10, fontWeight: '800', borderWidth: 1, borderColor: '#58A6FF', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  addPerfilBtn:       { borderWidth: 1, borderColor: '#30363D', borderStyle: 'dashed', borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 4 },
  addPerfilBtnText:   { color: '#8B949E', fontWeight: '600' },

  // ── Header perfil activo ───────────────────
  headerPerfilBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1F6FEB22', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#1F6FEB55', marginTop: 4 },
  headerPerfilText:  { color: '#58A6FF', fontSize: 11, fontWeight: '600' },

  // ── Modal ─────────────────────────────────
  modalOverlay:     { flex: 1, backgroundColor: '#000000AA', justifyContent: 'center', alignItems: 'center' },
  modalBox:         { backgroundColor: '#161B22', borderRadius: 16, padding: 24, width: '85%', borderWidth: 1, borderColor: '#30363D' },
  modalTitle:       { color: '#E6EDF3', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  modalSubtitle:    { color: '#8B949E', fontSize: 12, fontWeight: '600', marginBottom: 10, marginTop: 8 },
  modalInput:       { backgroundColor: '#0D1117', borderWidth: 1, borderColor: '#30363D', borderRadius: 10, padding: 12, color: '#E6EDF3', fontSize: 15, marginBottom: 8 },
  avatarGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  avatarBtn:        { width: 44, height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#30363D', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1117' },
  avatarBtnActive:  { borderColor: '#58A6FF', backgroundColor: '#1F6FEB22' },
  avatarEmoji:      { fontSize: 22 },
  modalActions:     { flexDirection: 'row', gap: 10 },
  modalCancel:      { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#30363D', alignItems: 'center' },
  modalCancelText:  { color: '#8B949E', fontWeight: '600' },
  modalConfirm:     { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#1F6FEB', alignItems: 'center' },
  modalConfirmText: { color: '#fff', fontWeight: '700' },

  // ── Asiento ───────────────────────────────
  asientoValorRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  asientoValorGrande: { color: '#58A6FF', fontSize: 36, fontWeight: '800' },
  asientoUnidad:      { color: '#8B949E', fontSize: 16, marginTop: 8 },
  asientoBadge:       { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  asientoBadgeText:   { fontSize: 12, fontWeight: '700' },

  barraFondo:   { height: 10, backgroundColor: '#21262D', borderRadius: 5, marginBottom: 14, overflow: 'hidden' },
  barraRelleno: { height: 10, borderRadius: 5 },

  asientoControles: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  asientoBtn:       { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#58A6FF', alignItems: 'center' },
  asientoBtnText:   { color: '#58A6FF', fontWeight: '700', fontSize: 13 },
  asientoBtnDisabled: { opacity: 0.3 },
  asientoBtnReset:  { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#30363D', alignItems: 'center' },
  asientoBtnResetText: { color: '#8B949E', fontWeight: '600', fontSize: 12 },

  // Visualizador de inclinación
  inclinacionVisual: { height: 90, alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative' },
  inclinacionBase:   { position: 'absolute', bottom: 10, left: 40, right: 40, height: 2, backgroundColor: '#30363D', borderRadius: 1 },
  inclinacionBarra:  { position: 'absolute', bottom: 10, left: '50%', width: 4, height: 60, backgroundColor: '#58A6FF', borderRadius: 2, transformOrigin: 'bottom center' },
  inclinacionPivot:  { position: 'absolute', bottom: 7, left: '50%', width: 8, height: 8, backgroundColor: '#58A6FF', borderRadius: 4, marginLeft: -4 },
  inclinacionAngulo: { position: 'absolute', top: 0, color: '#8B949E', fontSize: 12 },

  escalaRow:   { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  escalaLabel: { color: '#6E7681', fontSize: 10 },

  // ── Volumen sensor ────────────────────────
  volumenContainer:  { marginTop: 14 },
  volumenHeader:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  volumenIcono:      { fontSize: 20 },
  volumenLabel:      { color: '#C9D1D9', fontSize: 13, flex: 1 },
  volumenValor:      { color: '#58A6FF', fontSize: 15, fontWeight: '700' },

  volumenControles:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  volumenBtn:        { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: '#30363D', alignItems: 'center', justifyContent: 'center', backgroundColor: '#161B22' },
  volumenBtnText:    { color: '#C9D1D9', fontSize: 20, fontWeight: '700', lineHeight: 24 },

  volumenSegmentos:  { flex: 1, flexDirection: 'row', gap: 3 },
  volumenSegmento:   { flex: 1, height: 28, borderRadius: 4 },
});