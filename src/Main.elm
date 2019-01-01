module Main exposing (..)

import Browser
import Html exposing (Html, text, div, h1, img, p, button, a)
import Html.Attributes exposing (src, class, href, target, rel, alt)
import Html.Events exposing (onClick)



---- MODEL ----


type alias Model =
    {
        currentScene: String
       , changedScenes: Bool
    }


init : ( Model, Cmd Msg )
init =
    ( 
        { 
            currentScene = "intro"
           ,changedScenes = False 
        }
        , Cmd.none 
    )



---- UPDATE ----


type Msg
    = NoOp 
    | ChangeScene String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )
        ChangeScene (scene) ->
            ({ currentScene = scene, changedScenes = True }, Cmd.none)


---- UTILS ----
stackShareUrl : String
stackShareUrl = "https://stackshare.io/dielduarte/my-stack"

githubUrl : String
githubUrl = "https://github.com/dielduarte"

linkedinUrl : String
linkedinUrl = "https://www.linkedin.com/in/dielduarte/"

twitterUrl : String
twitterUrl = "https://twitter.com/diel_duarte"

blogUrl : String
blogUrl = "https://medium.com/codeuai"
 

getHideActiveClass : Model -> String
getHideActiveClass model =
    if model.currentScene == "skills" ||  model.currentScene == "contact"  then
        "hide"
    else if model.currentScene == "showMenu" || model.changedScenes == True then
        "active"
    else
        ""
getHideActiveClassForCustomActions : Model -> String -> String
getHideActiveClassForCustomActions model scene =
    if model.currentScene == scene then
        "active"
    else
        "hide"

---- VIEW ----

view : Model -> Html Msg
view model =
    div [ class "container" ] [
       h1[ class "loading" ][ text "loading..." ]
        , div [class "avatar-container"] [
            img [ src "/assets/avatar.png", class "avatar", alt "My avatar in pixel art" ][]
            , div [ class "cbbl -right avatar-bubble" ][ p [ class ("scene-text " ++ model.currentScene) ][] ]
        ]
        , div [ class ("buttons-container " ++ getHideActiveClass model) ] [
            button [ class "btn cbbl -hover", onClick (ChangeScene "experiencies") ][ text "Experiencies" ]
            , button [ class "btn cbbl -hover", onClick (ChangeScene "education") ][ text "Education" ]
            , button [ class "btn cbbl -hover", onClick (ChangeScene "skills") ][ text "Skills" ]
            , button [ class "btn cbbl -hover", onClick (ChangeScene "contact") ][ text "Contact" ]
        ]
        , div [ class ("buttons-container " ++ getHideActiveClassForCustomActions model "skills") ] [
            button [ class "btn cbbl -hover", onClick (ChangeScene "showMenu") ][ text "<- Back" ]
            , a [ class "btn cbbl -hover", href stackShareUrl, target "blank", rel "noopener noreferrer" ][ text "My skills" ]
        ]
        , div [ class ("buttons-container " ++ getHideActiveClassForCustomActions model "contact") ] [
            button [ class "btn cbbl -hover", onClick (ChangeScene "showMenu") ][ text "<- Back" ]
            , a [ class "btn cbbl -hover", href githubUrl, target "blank", rel "noopener noreferrer"][ text "github" ]
            , a [ class "btn cbbl -hover", href linkedinUrl, target "blank", rel "noopener noreferrer"][ text "linkedin" ]
            , a [ class "btn cbbl -hover", href twitterUrl, target "blank", rel "noopener noreferrer"][ text "twitter" ]
            , a [ class "btn cbbl -hover", href blogUrl, target "blank", rel "noopener noreferrer"][ text "blog" ]
        ]
    ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
