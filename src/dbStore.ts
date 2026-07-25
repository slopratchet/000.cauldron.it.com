import { Watch, SavedConfig } from './types';
import { STATIC_WATCH_DATA, STATIC_CONFIG_OPTIONS } from './data';

export interface DbMeta {
  app_id: string;
  name: string;
  description: string;
  version: string;
  registry_status: string;
  server_time: string;
  stable_servers: boolean;
  modalFieldManualHeader: string;
  modalAuthenticStatusHeader: string;
  modalAuthenticStatusText: string;
  modalStatsMatrixHeader: string;
  modalChecksumText: string;
  labelCaseDiameter: string;
  labelMaterial: string;
  labelWaterResistance: string;
  labelMovement: string;
  labelPowerReserve: string;
  labelBezel: string;
  labelDial: string;
  labelStrap: string;
  showButtonCamp?: boolean;
  showButtonSearch?: boolean;
  showButtonShowroom?: boolean;
  showButtonSaved?: boolean;
  showButtonConfigure?: boolean;
  btnObserveMovementLabel?: string;
  btnObserveMovementActiveLabel?: string;
  btnConfigureCampaignLabel?: string;
  btnExploreSettingLabel?: string;
  btnDiscoverMoreLabel?: string;
  btnConfigureLabel?: string;
  campUrl?: string;
  targetUrl?: string;
  marqueeSpeedSeconds?: number;
  marqueeImageHeightPx?: number;
  marqueeDirection?: 'left' | 'right';
  showOverlayTextBoxes?: boolean;
  overlayTextLabel?: string;
  overlayTextPosition?: string;
  overlayTextLineAccent?: boolean;
  overlayTextLinePlacement?: 'top' | 'bottom' | string;
}

export interface TickerTapeItemObject {
  src?: string;
  url?: string;
  image?: string;
  label?: string;
  text?: string;
  position?: string;
  show?: boolean;
  show_overlay_text?: boolean;
  hasLineAccent?: boolean;
  linePlacement?: 'top' | 'bottom' | string;
  line_placement?: 'top' | 'bottom' | string;
}

export type TickerTapeItem = string | TickerTapeItemObject;

export interface TickerTapeConfig {
  speed_seconds?: number;
  flow_direction?: 'left' | 'right' | string;
  show_overlay_text?: boolean;
  overlay_label?: string;
  overlay_labels?: string[];
  overlay_position?: string;
  overlay_positions?: string[];
  overlay_line_accent?: boolean;
  overlay_line_placement?: 'top' | 'bottom' | string;
  items: TickerTapeItem[];
}

export type TickerTapeEntry = TickerTapeItem[] | TickerTapeConfig;

export interface DbTickertapes {
  main: TickerTapeEntry;
  'primal-mama': TickerTapeEntry;
  'toot-and-scute-unusual-simulation-service': TickerTapeEntry;
  'perfect-beeing': TickerTapeEntry;
  'blessed-and-the-bounded': TickerTapeEntry;
  mythrokahn: TickerTapeEntry;
  [key: string]: TickerTapeEntry;
}

export interface ParsedTickerTapeItem {
  src: string;
  label: string;
  position: string;
  showOverlayText: boolean;
  hasLineAccent: boolean;
  linePlacement: 'top' | 'bottom';
}

export interface ParsedTickerTape {
  items: string[];
  rawItems: ParsedTickerTapeItem[];
  speedSeconds: number;
  direction: 'left' | 'right';
  showOverlayText: boolean;
  overlayLabel: string;
  overlayLabels: string[];
  overlayPosition: string;
  overlayPositions: string[];
  overlayLineAccent: boolean;
  overlayLinePlacement: 'top' | 'bottom';
}

export function parseTickerTape(
  entry: any,
  defaultSpeed = 54,
  defaultDir = 'left',
  defaultShowOverlay = true,
  defaultOverlayLabel = 'TITLE HERE',
  defaultOverlayPos = 'top-left',
  defaultLineAccent = true,
  defaultLinePlacement: 'top' | 'bottom' | string = 'top',
): ParsedTickerTape {
  const normDefaultPlacement: 'top' | 'bottom' = String(defaultLinePlacement)
    .toLowerCase()
    .includes('bottom')
    ? 'bottom'
    : 'top';
  if (!entry) {
    return {
      items: [],
      rawItems: [],
      speedSeconds: defaultSpeed,
      direction: 'left',
      showOverlayText: defaultShowOverlay,
      overlayLabel: defaultOverlayLabel,
      overlayLabels: [],
      overlayPosition: defaultOverlayPos,
      overlayPositions: [],
      overlayLineAccent: defaultLineAccent,
      overlayLinePlacement: normDefaultPlacement,
    };
  }

  let rawList: any[] = [];
  let speed = defaultSpeed;
  let direction: 'left' | 'right' = defaultDir === 'right' ? 'right' : 'left';
  let showOverlay = defaultShowOverlay;
  let label = defaultOverlayLabel;
  let labels: string[] = [];
  let position = defaultOverlayPos;
  let positions: string[] = [];
  let lineAccent = defaultLineAccent;
  let linePlacement: 'top' | 'bottom' = normDefaultPlacement;

  if (Array.isArray(entry)) {
    rawList = entry;
  } else if (typeof entry === 'object') {
    rawList = Array.isArray(entry.items) ? entry.items : [];

    const rawSpeed = Number(
      entry.speed_seconds ?? entry.speedSeconds ?? defaultSpeed,
    );
    speed = !isNaN(rawSpeed) && rawSpeed > 0 ? rawSpeed : defaultSpeed;

    const rawDir = String(
      entry.flow_direction ?? entry.flowDirection ?? defaultDir,
    ).toLowerCase();
    direction = rawDir.includes('right') ? 'right' : 'left';

    if (entry.show_overlay_text !== undefined)
      showOverlay = Boolean(entry.show_overlay_text);
    if (entry.showOverlayText !== undefined)
      showOverlay = Boolean(entry.showOverlayText);

    if (entry.overlay_label !== undefined) label = String(entry.overlay_label);
    if (entry.overlayLabel !== undefined) label = String(entry.overlayLabel);

    if (Array.isArray(entry.overlay_labels))
      labels = entry.overlay_labels.map(String);
    if (Array.isArray(entry.overlayLabels))
      labels = entry.overlayLabels.map(String);

    if (entry.overlay_position !== undefined)
      position = String(entry.overlay_position);
    if (entry.overlayPosition !== undefined)
      position = String(entry.overlayPosition);

    if (Array.isArray(entry.overlay_positions))
      positions = entry.overlay_positions.map(String);
    if (Array.isArray(entry.overlayPositions))
      positions = entry.overlayPositions.map(String);

    if (entry.overlay_line_accent !== undefined)
      lineAccent = Boolean(entry.overlay_line_accent);
    if (entry.overlayLineAccent !== undefined)
      lineAccent = Boolean(entry.overlayLineAccent);

    const rawPlacement = String(
      entry.overlay_line_placement ??
        entry.overlayLinePlacement ??
        entry.line_placement ??
        entry.linePlacement ??
        defaultLinePlacement,
    ).toLowerCase();
    linePlacement = rawPlacement.includes('bottom') ? 'bottom' : 'top';
  }

  const rawItems: ParsedTickerTapeItem[] = rawList.map((item, idx) => {
    const itemLabelDefault =
      labels.length > 0 ? labels[idx % labels.length] : label;
    if (typeof item === 'string') {
      const pos =
        positions.length > 0 ? positions[idx % positions.length] : position;
      return {
        src: item,
        label: itemLabelDefault,
        position: pos,
        showOverlayText: showOverlay,
        hasLineAccent: lineAccent,
        linePlacement: linePlacement,
      };
    } else if (item && typeof item === 'object') {
      const src = item.src || item.url || item.image || item.path || '';
      const itemShow =
        item.show ??
        item.show_overlay_text ??
        item.showOverlayText ??
        showOverlay;
      const itemLabel = item.label ?? item.text ?? itemLabelDefault;
      const itemPos =
        item.position ??
        (positions.length > 0 ? positions[idx % positions.length] : position);
      const itemAccent =
        item.hasLineAccent ??
        item.lineAccent ??
        item.overlay_line_accent ??
        lineAccent;
      const rawItemPlacement = String(
        item.linePlacement ??
          item.line_placement ??
          item.overlay_line_placement ??
          item.overlayLinePlacement ??
          linePlacement,
      ).toLowerCase();
      const itemPlacement: 'top' | 'bottom' = rawItemPlacement.includes(
        'bottom',
      )
        ? 'bottom'
        : 'top';
      return {
        src: String(src),
        label: String(itemLabel),
        position: String(itemPos),
        showOverlayText: Boolean(itemShow),
        hasLineAccent: Boolean(itemAccent),
        linePlacement: itemPlacement,
      };
    }
    return {
      src: String(item),
      label: itemLabelDefault,
      position: position,
      showOverlayText: showOverlay,
      hasLineAccent: lineAccent,
      linePlacement: linePlacement,
    };
  });

  const items = rawItems.map((p) => p.src);

  return {
    items,
    rawItems,
    speedSeconds: speed,
    direction,
    showOverlayText: showOverlay,
    overlayLabel: label,
    overlayLabels: labels,
    overlayPosition: position,
    overlayPositions: positions,
    overlayLineAccent: lineAccent,
    overlayLinePlacement: linePlacement,
  };
}

export interface MasterDb {
  meta: DbMeta;
  card_order: string[];
  tickertapes: DbTickertapes;
  watches: Watch[];
  config_options: typeof STATIC_CONFIG_OPTIONS;
  saved_configs: SavedConfig[];
}

export const DEFAULT_MASTER_DB: MasterDb = {
  meta: {
    app_id: 'the-archive-protocol',
    name: 'THE ARCHIVE PROTOCOL - Catalog',
    description:
      'High-fidelity catalog and design customizer for The Archive Protocol watch collections.',
    version: '1.10',
    registry_status: 'TITAN-FORGED COOLDOWN SYSTEM ACCESS ACTIVE',
    server_time: '2026-07-19T06:10:35-07:00',
    stable_servers: true,
    modalFieldManualHeader: 'FIELD OPERATIONS MANUAL (SECURE ENTRY)',
    modalAuthenticStatusHeader: 'AUTHENTIC CHRONOMETER STATUS',
    modalAuthenticStatusText:
      'COSC certified. Inspected under high vacuum conditions. Tested for 600 hours.',
    modalStatsMatrixHeader: 'ARTIFACT STATS & SPECIFICATION MATRIX',
    modalChecksumText: 'CHECKSUM: OK',
    labelCaseDiameter: 'ITEM LEVEL (iLvl)',
    labelMaterial: 'FORGED MATERIAL',
    labelWaterResistance: 'DUNGEON ATTUNEMENT',
    labelMovement: 'TEMPORAL CHRONO-ENGINE',
    labelPowerReserve: 'BUFF DURATION CAPACITY',
    labelBezel: 'ACTIVE RESONATOR',
    labelDial: 'SIGIL MATRIX CORE',
    labelStrap: 'SLOT SOCKET / GRIP',
    showButtonCamp: true,
    showButtonSearch: true,
    showButtonShowroom: true,
    showButtonSaved: true,
    showButtonConfigure: true,
    btnObserveMovementLabel: '[Observe Movement]',
    btnObserveMovementActiveLabel: '[OBSERVED MOVEMENT]',
    btnConfigureCampaignLabel: 'CONFIGURE CAMPAIGN',
    btnExploreSettingLabel: 'EXPLORE SETTING',
    btnDiscoverMoreLabel: 'DISCOVER MORE',
    btnConfigureLabel: 'CONFIGURE',
    campUrl: 'https://campcandor.com',
    targetUrl: 'https://campcandor.com',
    marqueeSpeedSeconds: 54,
    marqueeImageHeightPx: 80,
    marqueeDirection: 'left',
    showOverlayTextBoxes: true,
    overlayTextLabel: 'PEREGRINE FALCON',
    overlayTextPosition: 'top-left',
    overlayTextLineAccent: true,
    overlayTextLinePlacement: 'top',
  },
  card_order: [
    'primal-mama',
    'toot-and-scute-unusual-simulation-service',
    'perfect-beeing',
    'blessed-and-the-bounded',
    'mythrokahn',
  ],
  tickertapes: {
    main: {
      speed_seconds: 20,
      flow_direction: 'left',
      items: [
        'HIGH-FIDELITY LOOT & STAT REGISTRY',
        'THE CHRONO-RAID PROTOCOL DATABASE v1.10',
        'TITAN-FORGED COOLDOWN SYSTEM ACCESS',
        'REALM SERVERS RUNNING STABLE',
        'GNOMISH SPECIFICATION SHIELD',
      ],
    },
    'primal-mama': {
      speed_seconds: 54,
      flow_direction: 'left',
      show_overlay_text: true,
      overlay_label: 'PEREGRINE FALCON',
      overlay_labels: [
        'PEREGRINE FALCON',
        'SNOWY OWL',
        'GOLDEN EAGLE',
        'CEDAR WAXWING',
      ],
      overlay_position: 'top-left',
      overlay_positions: [
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-right',
      ],
      overlay_line_accent: true,
      overlay_line_placement: 'top',
      items: ['/banner-olive.svg'],
    },
    'toot-and-scute-unusual-simulation-service': {
      speed_seconds: 35,
      flow_direction: 'right',
      show_overlay_text: true,
      overlay_label: 'GREAT HORNED OWL',
      overlay_labels: [
        'GREAT HORNED OWL',
        'KINGFISHER',
        'HARPY EAGLE',
        'OSPREY',
      ],
      overlay_position: 'top-left',
      overlay_positions: [
        'bottom-left',
        'top-right',
        'bottom-right',
        'top-left',
      ],
      overlay_line_accent: true,
      overlay_line_placement: 'bottom',
      items: ['/banner-olive.svg'],
    },
    'perfect-beeing': {
      speed_seconds: 45,
      flow_direction: 'left',
      show_overlay_text: true,
      overlay_label: 'GYRFALCON',
      overlay_labels: ['GYRFALCON', 'BLACK HERON', 'RAVEN', 'BARN OWL'],
      overlay_position: 'top-left',
      overlay_positions: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
      ],
      overlay_line_accent: true,
      overlay_line_placement: 'top',
      items: ['/banner-olive.svg'],
    },
    'blessed-and-the-bounded': {
      speed_seconds: 40,
      flow_direction: 'left',
      show_overlay_text: true,
      overlay_label: 'OSPREY',
      overlay_labels: [
        'OSPREY',
        'PEREGRINE FALCON',
        'SNOWY OWL',
        'HARPY EAGLE',
      ],
      overlay_position: 'top-left',
      overlay_positions: [
        'bottom-right',
        'top-left',
        'top-right',
        'bottom-left',
      ],
      overlay_line_accent: true,
      overlay_line_placement: 'bottom',
      items: ['/banner-olive.svg'],
    },
    mythrokahn: {
      speed_seconds: 28,
      flow_direction: 'right',
      show_overlay_text: true,
      overlay_label: 'RAVEN',
      overlay_labels: [
        'RAVEN',
        'GOLDEN EAGLE',
        'GREAT HORNED OWL',
        'KINGFISHER',
      ],
      overlay_position: 'top-left',
      overlay_positions: [
        'top-left',
        'bottom-left',
        'top-right',
        'bottom-right',
      ],
      overlay_line_accent: true,
      overlay_line_placement: 'top',
      items: ['/banner-olive.svg'],
    },
  },
  watches: STATIC_WATCH_DATA,
  config_options: STATIC_CONFIG_OPTIONS,
  saved_configs: [],
};

const STORAGE_KEY = 'archive_protocol_master_db';

export function getMasterDb(): MasterDb {
  const stored = (typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)(STORAGE_KEY);
  if (!stored) {
    // Merge existing localstorage-based user saved_configs if any
    const localConfigs = (typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)('archive_protocol_configs');
    const db = { ...DEFAULT_MASTER_DB };
    if (localConfigs) {
      try {
        db.saved_configs = JSON.parse(localConfigs);
      } catch (e) {
        console.error('Error migrating configurations on first DB load', e);
      }
    }
    return db;
  }
  try {
    const parsed = JSON.parse(stored) as MasterDb;
    // Make sure we have the required keys
    if (
      !parsed.meta ||
      !parsed.tickertapes ||
      !parsed.watches ||
      !parsed.config_options
    ) {
      return DEFAULT_MASTER_DB;
    }
    // Deeply merge default values so that new schema fields are always populated
    parsed.meta = { ...DEFAULT_MASTER_DB.meta, ...parsed.meta };

    // Migrate cached primal-mama-alt keys to mythrokahn
    if (parsed.tickertapes && (parsed.tickertapes as any)['primal-mama-alt']) {
      if (!parsed.tickertapes['mythrokahn']) {
        parsed.tickertapes['mythrokahn'] = (parsed.tickertapes as any)[
          'primal-mama-alt'
        ];
      }
      delete (parsed.tickertapes as any)['primal-mama-alt'];
    }

    parsed.watches = (parsed.watches || []).map((w) => {
      if (w.id === ('primal-mama-alt' as any)) {
        return { ...w, id: 'mythrokahn' };
      }
      return w;
    });

    // Ensure card_order is populated
    const cardOrder =
      Array.isArray(parsed.card_order) && parsed.card_order.length > 0
        ? parsed.card_order
        : DEFAULT_MASTER_DB.card_order;
    parsed.card_order = cardOrder;

    // Dynamically append any missing default watches that weren't stored in localStorage yet
    const existingIds = new Set((parsed.watches || []).map((w) => w.id));
    const missingWatches = DEFAULT_MASTER_DB.watches.filter(
      (dw) => !existingIds.has(dw.id),
    );

    let mergedWatches = [
      ...(parsed.watches || []).map((w) => {
        const defaultWatch = DEFAULT_MASTER_DB.watches.find(
          (dw) => dw.id === w.id,
        );
        if (defaultWatch) {
          const merged = {
            ...defaultWatch,
            ...w,
            specs: { ...defaultWatch.specs, ...w.specs },
          };
          // Sync updated name and refs from default dataset
          merged.ref = defaultWatch.ref;
          delete (merged as any).ref2;
          if (merged.id === 'primal-mama') {
            merged.name = defaultWatch.name;
          }
          return merged;
        }
        return w;
      }),
      ...missingWatches,
    ];

    // Sort watches according to card_order
    if (Array.isArray(cardOrder) && cardOrder.length > 0) {
      const orderMap = new Map(cardOrder.map((id, index) => [id, index]));
      mergedWatches.sort((a, b) => {
        const idxA = orderMap.has(a.id) ? orderMap.get(a.id)! : 999;
        const idxB = orderMap.has(b.id) ? orderMap.get(b.id)! : 999;
        return idxA - idxB;
      });
    }

    mergedWatches = mergedWatches.map((w) => {
      const { ref2, ...rest } = w as any;
      return rest;
    });

    parsed.watches = mergedWatches;

    // Also merge any missing tickertapes
    parsed.tickertapes = {
      ...DEFAULT_MASTER_DB.tickertapes,
      ...parsed.tickertapes,
    };

    // Update card tickertapes if cached items are text and don't contain image paths
    Object.keys(DEFAULT_MASTER_DB.tickertapes).forEach((key) => {
      if (key !== 'main') {
        const tape = parsed.tickertapes[key];
        const tapeInfo = parseTickerTape(tape);
        const hasOldBlocks = tapeInfo.items.some(
          (item) =>
            typeof item === 'string' &&
            (item.includes('/block-red') ||
              item.includes('/block-green') ||
              item.includes('/block-blue')),
        );
        if (hasOldBlocks || tapeInfo.items.length === 0) {
          parsed.tickertapes[key] = DEFAULT_MASTER_DB.tickertapes[key];
        }
      }
    });

    return parsed;
  } catch (e) {
    console.error(
      'Error loading master database from storage, falling back to defaults',
      e,
    );
    return DEFAULT_MASTER_DB;
  }
}

export function saveMasterDb(db: MasterDb): void {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  // Sync back to traditional keys to avoid breaking existing dialog components
  if (typeof window !== 'undefined') localStorage.setItem(
    'archive_protocol_configs',
    JSON.stringify(db.saved_configs),
  );
}

export function resetMasterDb(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
}
