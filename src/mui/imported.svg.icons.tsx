import React from 'react'
import {
  BeenhereOutlined, CheckCircleOutline, DoneOutline, PersonAddOutlined,
  PhoneOutlined, VpnKeyOutlined, BuildOutlined, DoneAllOutlined,
  DoneOutlineOutlined, DraftsOutlined, HighlightOffOutlined, HomeOutlined,
  HotelOutlined, HouseOutlined, HowToRegOutlined, HourglassEmptyOutlined,
  HttpsOutlined, ImageSearchOutlined, InfoOutlined, PowerSettingsNewOutlined,
  QueryBuilderOutlined, RemoveCircleOutlineOutlined, RemoveRedEyeOutlined,
  ReportOutlined, ReportProblemOutlined, SearchOutlined, SettingsOutlined
} from '@mui/icons-material'

export default function getImportedSvgIcon (iconName: string, props?: any) {

  switch (iconName.toLowerCase()) {

  case 'phone_outline':
  case 'call_outline':
    return <PhoneOutlined {...props} />

  case 'personaddoutlined':
  case 'person_add_outline':
    return <PersonAddOutlined {...props} />

  case 'vpn_key_outline':
    return <VpnKeyOutlined {...props} />

  case 'checkcircleoutline':
  case 'check_circle_outline':
    return <CheckCircleOutline {...props} />

  case 'doneoutline':
  case 'done_outline':
    return <DoneOutline {...props} />

  case 'beenhereoutline':
  case 'been_here_outline':
    return <BeenhereOutlined {...props} />

  case 'buildoutlined':
  case 'build_outline':
    return <BuildOutlined {...props} />

  case 'donealloutlined':
  case 'done_all_outline':
    return <DoneAllOutlined {...props} />

  case 'doneoutlineoutlined':
  case 'done_outline_outline':
    return <DoneOutlineOutlined {...props} />

  case 'draftsoutlined':
  case 'drafts_outline':
    return <DraftsOutlined {...props} />

  case 'highlightoffoutlined':
  case 'highlight_off_outline':
    return <HighlightOffOutlined {...props} />

  case 'homeoutlined':
  case 'home_outline':
    return <HomeOutlined {...props} />

  case 'houseoutlined':
  case 'house_outline':
    return <HouseOutlined {...props} />

  case 'hoteloutlined':
  case 'hotel_outline':
    return <HotelOutlined {...props} />

  case 'hourglassemptyoutlined':
  case 'hourglass_empty_outline':
    return <HourglassEmptyOutlined {...props} />

  case 'howtoregoutlined':
  case 'how_to_reg_outline':
    return <HowToRegOutlined {...props} />

  case 'httpsoutlined':
  case 'https_outline':
    return <HttpsOutlined {...props} />

  case 'imagesearchoutlined':
  case 'image_search_outline':
    return <ImageSearchOutlined {...props} />

  case 'infooutlined':
  case 'info_outline':
    return <InfoOutlined {...props} />

  case 'powersettingsnewoutlined':
  case 'power_settings_new_outline':
    return <PowerSettingsNewOutlined {...props} />

  case 'querybuilderoutlined':
  case 'query_builder_outline':
    return <QueryBuilderOutlined {...props} />

  case 'removecircleoutlineoutlined':
  case 'remove_circle_outline_outline':
    return <RemoveCircleOutlineOutlined {...props} />

  case 'removeredeyeoutlined':
  case 'remove_red_eye_outline':
    return <RemoveRedEyeOutlined {...props} />

  case 'reportoutlined':
  case 'report_outline':
    return <ReportOutlined {...props} />

  case 'reportproblemoutlined':
  case 'report_problem_outline':
    return <ReportProblemOutlined {...props} />

  case 'searchoutlined':
  case 'search_outline':
    return <SearchOutlined {...props} />

  case 'settingsoutlined':
  case 'settings_outline':
    return <SettingsOutlined {...props} />

  // TODO Add more icons here to be exported if they are missing.

  default:
    return ( null )
  }

}
