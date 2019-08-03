package crnd

import (
    "fmt"
    "log"

    messages "./messages"
    proto "github.com/golang/protobuf/proto"
)

func Hello() string {
    p := &messages.Help{
        Name:    "name",
        }

    data, err := proto.Marshal(p)
    if err != nil {
      log.Fatal("marshaling error: ", err)
    }

    //fmt.Println(data)
    return proto.MarshalTextString(p)
    //return "Hello, world, from library!"
}
