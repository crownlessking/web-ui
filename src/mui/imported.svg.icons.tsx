import { Fragment } from 'react'
import * as Icon from '@mui/icons-material'
import { err } from '../controllers'

export default function getImportedSvgIcon (iconName: string, props?: any) {
  const iconTable: { [icon: string]: JSX.Element } = {
    'phone_outline': <Icon.PhoneOutlined {...props} />,
    'call_outline': <Icon.PhoneOutlined {...props} />,
    'personaddoutlined': <Icon.PersonAddOutlined {...props} />,
    'person_add_outline': <Icon.PersonAddOutlined {...props} />,
    'vpn_key_outline': <Icon.VpnKeyOutlined {...props} />,
    'checkcircleoutline': <Icon.CheckCircleOutline {...props} />,
    'check_circle_outline': <Icon.CheckCircleOutline {...props} />,
    'doneoutline': <Icon.DoneOutline {...props} />,
    'done_outline': <Icon.DoneOutline {...props} />,
    'beenhereoutline': <Icon.BeenhereOutlined {...props} />,
    'been_here_outline': <Icon.BeenhereOutlined {...props} />,
    'buildoutlined': <Icon.BuildOutlined {...props} />,
    'build_outline': <Icon.BuildOutlined {...props} />,
    'donealloutlined': <Icon.DoneAllOutlined {...props} />,
    'done_all_outline': <Icon.DoneAllOutlined {...props} />,
    'doneoutlineoutlined': <Icon.DoneOutlineOutlined {...props} />,
    'done_outline_outline': <Icon.DoneOutlineOutlined {...props} />,
    'draftsoutlined': <Icon.DraftsOutlined {...props} />,
    'drafts_outline': <Icon.DraftsOutlined {...props} />,
    'highlightoffoutlined': <Icon.HighlightOffOutlined {...props} />,
    'highlight_off_outline': <Icon.HighlightOffOutlined {...props} />,
    'homeoutlined': <Icon.HomeOutlined {...props} />,
    'home_outline': <Icon.HomeOutlined {...props} />,
    'houseoutlined': <Icon.HouseOutlined {...props} />,
    'house_outline': <Icon.HouseOutlined {...props} />,
    'hoteloutlined': <Icon.HotelOutlined {...props} />,
    'hotel_outline': <Icon.HotelOutlined {...props} />,
    'hourglassemptyoutlined': <Icon.HourglassEmptyOutlined {...props} />,
    'hourglass_empty_outline': <Icon.HourglassEmptyOutlined {...props} />,
    'howtoregoutlined': <Icon.HowToRegOutlined {...props} />,
    'how_to_reg_outline': <Icon.HowToRegOutlined {...props} />,
    'httpsoutlined': <Icon.HttpsOutlined {...props} />,
    'https_outline': <Icon.HttpsOutlined {...props} />,
    'imagesearchoutlined': <Icon.ImageSearchOutlined {...props} />,
    'image_search_outline': <Icon.ImageSearchOutlined {...props} />,
    'infooutlined': <Icon.InfoOutlined {...props} />,
    'info_outline': <Icon.InfoOutlined {...props} />,
    'powersettingsnewoutlined': <Icon.PowerSettingsNewOutlined {...props} />,
    'power_settings_new_outline': <Icon.PowerSettingsNewOutlined {...props} />,
    'querybuilderoutlined': <Icon.QueryBuilderOutlined {...props} />,
    'query_builder_outline': <Icon.QueryBuilderOutlined {...props} />,
    'removecircleoutlineoutlined': <Icon.RemoveCircleOutlineOutlined {...props} />,
    'remove_circle_outline_outline': <Icon.RemoveCircleOutlineOutlined {...props} />,
    'removeredeyeoutlined': <Icon.RemoveRedEyeOutlined {...props} />,
    'remove_red_eye_outline': <Icon.RemoveRedEyeOutlined {...props} />,
    'reportoutlined':  <Icon.ReportOutlined {...props} />,
    'report_outline':  <Icon.ReportOutlined {...props} />,
    'reportproblemoutlined':  <Icon.ReportProblemOutlined {...props} />,
    'report_problem_outline':  <Icon.ReportProblemOutlined {...props} />,
    'searchoutlined':  <Icon.SearchOutlined {...props} />,
    'search_outline':  <Icon.SearchOutlined {...props} />,
    'settingsoutlined': <Icon.SettingsOutlined {...props} />,
    'settings_outline': <Icon.SettingsOutlined {...props} />,
    'menu': <Icon.Menu {...props} />,
    'assignmentoutlined': <Icon.AssignmentOutlined {...props} />,
    'assignment_outline': <Icon.AssignmentOutlined {...props} />,
    'playlistaddoutlined': <Icon.PlaylistAddOutlined {...props} />,
    'playlist_add_outline': <Icon.PlaylistAddOutlined {...props} />,
    'subscriptionsoutlined': <Icon.SubscriptionsOutlined {...props} />,
    'subscriptions_outline': <Icon.SubscriptionsOutlined {...props} />,
    'addtoqueue': <Icon.AddToQueue {...props} />,
    'add_to_queue': <Icon.AddToQueue {...props} />,
    'AlternateEmailOutlined': <Icon.AlternateEmailOutlined {...props} />,
    'alternate_email_outline': <Icon.AlternateEmailOutlined {...props} />,
    'postAddOutlined': <Icon.PostAddOutlined {...props} />,
    'post_add_outline': <Icon.PostAddOutlined {...props} />,
    'publishOutlined': <Icon.PublishOutlined {...props} />,
    'publish_outline': <Icon.PublishOutlined {...props} />,
    'arrowForwardIosOutlined': <Icon.ArrowForwardIosOutlined {...props} />,
    'arrow_forward_ios_outline': <Icon.ArrowForwardIosOutlined {...props} />,
    'monitorOutlined': <Icon.MonitorOutlined {...props} />,
    'monitor_outline': <Icon.MonitorOutlined {...props} />,
    'none': <Fragment />
  }
  const iconName_lc = iconName.toLowerCase()
  if (iconName_lc in iconTable) {
    return iconTable[iconName_lc]
  }
  err('Invalid `iconName`')
  return iconTable['none']
}

// import {
//   BeenhereOutlined, CheckCircleOutline, DoneOutline, PersonAddOutlined,
//   PhoneOutlined, VpnKeyOutlined, BuildOutlined, DoneAllOutlined,
//   DoneOutlineOutlined, DraftsOutlined, HighlightOffOutlined, HomeOutlined,
//   HotelOutlined, HouseOutlined, HowToRegOutlined, HourglassEmptyOutlined,
//   HttpsOutlined, ImageSearchOutlined, InfoOutlined, PowerSettingsNewOutlined,
//   QueryBuilderOutlined, RemoveCircleOutlineOutlined, RemoveRedEyeOutlined,
//   ReportOutlined, ReportProblemOutlined, SearchOutlined, SettingsOutlined,
//   Menu, AssignmentOutlined, PlaylistAddOutlined, SubscriptionsOutlined,
//   AddToQueue, AlternateEmailOutlined
// } from '@mui/icons-material'