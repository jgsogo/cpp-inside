
#pragma once

template <typename T>
struct Serialized : public SerializedBase
{

    Serialized(const T& t)
    {
        size = t.ByteSizeLong();
        data = malloc(size);
        t.SerializeToArray(data, size);
    }

    ~Serialized()
    {
        free(data);
    }

    operator const SerializedBase*() const
    {
        return static_cast<const SerializedBase*>(this);
    }

    static T parse(const void* handler)
    {
        const Serialized* serialized = static_cast<const Serialized*>(handler);
        T t; t.ParseFromArray(serialized->data, serialized->size);
        return t;
    }
};
