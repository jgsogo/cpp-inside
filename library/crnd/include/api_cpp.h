#pragma once

#include "crnd/crnd_export.h"

#include "messages/status.pb.h"
#include "messages/help.pb.h"
#include "messages/sample_request.pb.h"
#include "messages/sample.pb.h"


CRND_EXPORT std::unique_ptr<crnd::Status> help(crnd::Help& help);
CRND_EXPORT std::unique_ptr<crnd::Status> sample(const crnd::SampleRequest&, crnd::Sample&);
